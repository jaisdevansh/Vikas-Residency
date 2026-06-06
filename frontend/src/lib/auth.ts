import { cookies } from 'next/headers';

const encoder = new TextEncoder();
const SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-me-in-production';

async function getCryptoKey(): Promise<CryptoKey> {
  const keyData = encoder.encode(SECRET);
  return crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Converts any BufferSource to a guaranteed plain ArrayBuffer (not SharedArrayBuffer)
function toArrayBuffer(data: ArrayBuffer | ArrayBufferView): ArrayBuffer {
  if (data instanceof ArrayBuffer) {
    return data.slice(0); // .slice() always returns a plain ArrayBuffer
  }
  // ArrayBufferView (Uint8Array, etc.)
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
}

// Converts ArrayBuffer to base64url string
function bufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Converts base64url string back to a plain ArrayBuffer
function base64urlToBuffer(base64url: string): ArrayBuffer {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  // .slice(0) guarantees the return type is ArrayBuffer, not ArrayBufferLike
  return bytes.buffer.slice(0) as ArrayBuffer;
}

export async function signToken(username: string): Promise<string> {
  const payload = JSON.stringify({
    username,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
  });

  const key = await getCryptoKey();
  const payloadBytes = toArrayBuffer(encoder.encode(payload));
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, payloadBytes);

  const signatureBase64 = bufferToBase64url(signatureBuffer as ArrayBuffer);
  const payloadBase64 = bufferToBase64url(payloadBytes);

  return `${payloadBase64}.${signatureBase64}`;
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payloadBase64, signatureBase64] = parts;

    // Decode payload
    const payloadBuffer = base64urlToBuffer(payloadBase64);
    const payload = new TextDecoder().decode(payloadBuffer);
    const { username, exp } = JSON.parse(payload);

    // Check expiry
    if (Date.now() > exp) return null;

    const key = await getCryptoKey();
    const signatureBuffer = base64urlToBuffer(signatureBase64);
    const payloadBytes = toArrayBuffer(encoder.encode(payload));

    const isValid = await crypto.subtle.verify('HMAC', key, signatureBuffer, payloadBytes);

    return isValid ? { username } : null;
  } catch {
    return null;
  }
}

export async function checkApiAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    if (!token) return false;

    const decoded = await verifyToken(token);
    return !!decoded;
  } catch {
    return false;
  }
}

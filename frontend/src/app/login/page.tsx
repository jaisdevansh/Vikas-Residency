"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Lock, User } from "lucide-react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("from") || "/admin";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push(returnUrl);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-card/10 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif text-white mb-2">Admin Access</h1>
        <p className="text-white/60 text-sm">Vikas Residency Dashboard</p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-lg text-sm mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 flex items-center gap-2">
            <User size={16} /> Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition"
            placeholder="admin"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 flex items-center gap-2">
            <Lock size={16} /> Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-white/20 bg-black/20 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition"
            placeholder="••••••••"
          />
        </div>

        <div className="flex justify-end -mt-2">
          <button
            type="button"
            onClick={() => setIsForgotOpen(true)}
            className="text-xs text-accent hover:underline focus:outline-none transition font-medium"
          >
            Forgot Password?
          </button>
        </div>

        <Button 
          type="submit" 
          variant="gold" 
          className="w-full py-4 text-lg mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Login to Dashboard"}
        </Button>
      </form>

      {/* Forgot Password Modal */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#1c1916] text-gray-900 dark:text-white rounded-3xl p-8 border border-gray-200 dark:border-white/10 shadow-2xl relative text-left">
            <h3 className="text-2xl font-serif text-primary dark:text-[var(--primary)] mb-4">Forgot Password?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              For security, admin credentials are encrypted and stored in the server environment configuration files. 
              Please contact the residency host team to retrieve or reset your login credentials.
            </p>
            <div className="space-y-3">
              <a
                href="https://wa.me/919795756509?text=Hello%20Host,%20I%20forgot%20my%20Vikas%20Residency%20admin%20panel%20password.%20Please%20help%20me%20reset%20it."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 bg-accent text-[#0f3d2e] font-bold rounded-xl hover:bg-accent-hover transition-colors shadow-md text-sm"
              >
                Request Reset via WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setIsForgotOpen(false)}
                className="w-full py-3 bg-gray-200 dark:bg-white/10 text-gray-800 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-white/20 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary dark:bg-[#0a0908] relative px-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>

      <Suspense fallback={<div className="text-white">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

import { neon } from '@neondatabase/serverless';

// Fallback for development without DB URL
const connectionString = process.env.DATABASE_URL || "postgres://dummy:dummy@dummy.neon.tech/neondb";

// neon() creates a connection that works perfectly in Edge/Serverless runtimes
export const sql = neon(connectionString);

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

if (!process.env.TURSO_CONNECTION_URL || !process.env.TURSO_AUTH_TOKEN) {
  throw new Error('Missing TURSO_CONNECTION_URL env var');
}

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);

export class DBConnection {
  url: string;
  authToken: string;

  constructor(url: string, authToken: string) {
    this.url = url;
    this.authToken = authToken;
  }

  get client() {
    return createClient({
      url: this.url,
      authToken: this.authToken
    });
  }

  get db() {
    return drizzle(this.client);
  }
}

export const rootdb = new DBConnection(process.env.TURSO_CONNECTION_URL!, process.env.TURSO_AUTH_TOKEN!);

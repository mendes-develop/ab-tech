import { createClient } from '@supabase/supabase-js'
if (!Bun.env.SUPABASE_KEY || !Bun.env.SUPABASE_BASE_URL) {
  throw new Error("Supabase credentials are missing.");
}

export const supabaseClient = createClient(Bun.env.SUPABASE_BASE_URL, Bun.env.SUPABASE_KEY)
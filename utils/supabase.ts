import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('Supabase URL is not defined in environment variables');
}

if (!supabaseKey) {
  console.error('Supabase Anon Key is not defined in environment variables');
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseKey || ''
);
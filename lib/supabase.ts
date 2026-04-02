import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

// Fallback to empty strings if env fails to prevent the "undefined" crash
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl) {
  console.warn("⚠️ Supabase URL is missing from .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

// (Intentionally left without global type augmentation to avoid mismatches with local Database type)

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        db: {
            schema: 'public'
        }
    }
)

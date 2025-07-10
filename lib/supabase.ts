import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Returns a singleton Supabase **browser** client.
 * – Initialises lazily so missing env vars don’t crash the whole app.
 * – Logs a clear warning if the env vars are absent.
 */
let _supabase: SupabaseClient | null = null

export function getSupabaseBrowserClient() {
  if (_supabase) return _supabase

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[Supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set – returning null client.",
    )
    return null
  }

  _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

/**
 * Compatibility export - matches previous `{ supabase }` import style.
 * Returns the same singleton client (or `null` if env vars are missing).
 */
export const supabase = getSupabaseBrowserClient()

/* ------------------------------------------------------------------ */
/* Types (unchanged)                                                  */
/* ------------------------------------------------------------------ */

export interface User {
  id: string
  email: string
  full_name?: string
  role: "admin" | "editor"
  avatar_url?: string
  organization?: string
  bio?: string
  website?: string
  created_at: string
  updated_at: string
}

export interface Page {
  id: string
  title: string
  slug: string
  content?: any
  meta_title?: string
  meta_description?: string
  status: "draft" | "published" | "archived"
  featured_image?: string
  author_id?: string
  created_at: string
  updated_at: string
  published_at?: string
}

export interface PortfolioItem {
  id: string
  title: string
  slug: string
  description?: string
  content?: any
  featured_image?: string
  gallery?: string[]
  technologies?: string[]
  client_name?: string
  project_url?: string
  github_url?: string
  status: "draft" | "published" | "archived"
  featured: boolean
  order_index: number
  author_id?: string
  created_at: string
  updated_at: string
  published_at?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  status: "unread" | "read" | "replied" | "archived"
  source: string
  metadata?: any
  created_at: string
  updated_at: string
}

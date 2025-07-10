import { getSupabaseBrowserClient } from "@/lib/supabase"

const supabase = getSupabaseBrowserClient()

/* ------------------------------------------------------------------ */
/* Sign-up / Sign-in helpers                                           */
/* ------------------------------------------------------------------ */

export async function signUp(email: string, password: string, fullName: string) {
  if (!supabase) return { data: null, error: "Supabase client unavailable" }
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
}

export async function signIn(email: string, password: string) {
  if (!supabase) return { data: null, error: "Supabase client unavailable" }
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  if (!supabase) return
  await supabase.auth.signOut()
}

/* ------------------------------------------------------------------ */
/* Profile helpers (profiles table)                                    */
/* ------------------------------------------------------------------ */

export async function getUserProfile(userId: string) {
  if (!supabase) return { data: null, error: "Supabase client unavailable" }
  return supabase.from("profiles").select("*").eq("id", userId).single()
}

export async function updateUserProfile(userId: string, updates: Record<string, unknown>) {
  if (!supabase) return { data: null, error: "Supabase client unavailable" }
  return supabase.from("profiles").update(updates).eq("id", userId).select().single()
}

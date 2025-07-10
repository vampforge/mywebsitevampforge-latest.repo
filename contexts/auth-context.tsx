"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getSupabaseBrowserClient, type User as DBUser } from "@/lib/supabase"
import {
  signUp as authSignUp,
  signIn as authSignIn,
  signOut as authSignOut,
  getUserProfile,
  updateUserProfile as authUpdateProfile,
} from "@/lib/auth"

interface AuthContextType {
  user: DBUser | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any | null }>
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<DBUser>) => Promise<{ error: any | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabaseBrowserClient()
  const [user, setUser] = useState<DBUser | null>(null)
  const [loading, setLoading] = useState(true)

  /* ------------------------------------------------------------------ */
  /* Initial session bootstrap                                           */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!supabase) {
      console.warn("[AuthProvider] Supabase client unavailable – auth disabled.")
      setLoading(false)
      return
    }
    ;(async () => {
      /* Get current session */
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (!error && session?.user) {
        await handleFetchProfile(session.user.id)
      }
      setLoading(false)
    })()

    /* Listen for subsequent auth events */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        handleFetchProfile(session.user.id)
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */

  const handleFetchProfile = async (userId: string) => {
    const { data, error } = await getUserProfile(userId)
    if (!error) setUser(data as DBUser)
  }

  /* ------------------------------------------------------------------ */
  /* Public API                                                          */
  /* ------------------------------------------------------------------ */

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) return { error: "Supabase client unavailable (signup blocked)" }
    setLoading(true)
    const { error } = await authSignUp(email, password, fullName)
    setLoading(false)
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: "Supabase client unavailable (signin blocked)" }
    setLoading(true)
    const { error } = await authSignIn(email, password)
    setLoading(false)
    return { error }
  }

  const signOut = async () => {
    if (!supabase) return
    setLoading(true)
    await authSignOut()
    setUser(null)
    setLoading(false)
  }

  const updateProfile = async (updates: Partial<DBUser>) => {
    if (!supabase || !user) return { error: "Supabase client unavailable (update blocked)" }
    const { error } = await authUpdateProfile(user.id, updates)
    if (!error) await handleFetchProfile(user.id)
    return { error }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside an <AuthProvider />")
  return ctx
}

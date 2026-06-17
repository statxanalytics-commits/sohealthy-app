import { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Profile {
  id: string
  name: string
  username: string
  email: string
  is_premium: boolean
  order_code: string | null
  plan_start: string | null
  avatar_url: string | null
}

interface AuthContextType {
  session: Session | null
  user: User | null
  profile: Profile | null
  isPremium: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, name: string, username: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  activatePremium: (orderCode: string) => Promise<{ error: string | null }>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const isPremium = profile?.is_premium ?? false

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (!error && data) setProfile(data)
    } catch (e) {
      console.error('fetchProfile error:', e)
    } finally {
      setLoading(false)
    }
  }

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id)
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signUp = async (email: string, password: string, name: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, username } },
    })

    if (error) return { error: error.message }

    // Create profile row
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        name,
        username,
        email,
        is_premium: false,
        order_code: null,
        plan_start: null,
      })
    }

    return { error: null }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  const activatePremium = async (orderCode: string) => {
    if (!user) return { error: 'Jo i kyçur' }

    // Check order code against orders table
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_code', orderCode.toUpperCase().trim())
      .single()

    if (orderError || !order) {
      return { error: 'Kodi nuk u gjet. Kontrollo dhe provo sërish.' }
    }

    if (order.used && order.activated_by !== user.id) {
      return { error: 'Ky kod është përdorur tashmë.' }
    }

    // Mark order as used and update profile
    const now = new Date().toISOString()

    await supabase.from('orders').update({
      used: true,
      verified_at: now,
      activated_by: user.id,
      device_token: null,
    }).eq('order_code', orderCode.toUpperCase().trim())

    await supabase.from('profiles').update({
      is_premium: true,
      order_code: orderCode.toUpperCase().trim(),
      plan_start: now,
    }).eq('id', user.id)

    await refreshProfile()
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{
      session, user, profile, isPremium, loading,
      signIn, signUp, signOut, activatePremium, refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

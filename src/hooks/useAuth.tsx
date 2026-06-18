import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi } from '@/lib/api'
import { Vendor } from '@/types'

interface AuthContextType {
  user: Vendor | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setAuthFromOnboarding: (token: string, user: Vendor) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Vendor | null>(null)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('bloom_token')
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('bloom_token')
    if (storedToken) {
      authApi.me()
        .then(res => { setUser(res.data.user); setToken(storedToken) })
        .catch(() => { localStorage.removeItem('bloom_token'); setToken(null) })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    const { token: t, user: u } = res.data
    localStorage.setItem('bloom_token', t)
    setToken(t)
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('bloom_token')
    setToken(null)
    setUser(null)
  }

  const setAuthFromOnboarding = (t: string, u: Vendor) => {
    localStorage.setItem('bloom_token', t)
    setToken(t)
    setUser(u)
  }

  return (
    <AuthContext.Provider value={{
      user, token,
      isAuthenticated: !!token && !!user,
      isLoading, login, logout, setAuthFromOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

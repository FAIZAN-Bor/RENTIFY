"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/")
    }
  }, [user, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        router.push("/")
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (user) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-teal-400/5 to-emerald-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-lg w-full relative z-10">
        <div className="bg-white/80 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-500 animate-slide-up">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden group">
                <span className="text-white font-bold text-2xl relative z-10">R</span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">Welcome back</h2>
            <p className="text-slate-600 text-lg">Sign in to your Rentify account</p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-xl border border-red-200/50 rounded-2xl shadow-lg animate-slide-up">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl group-hover:border-emerald-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-emerald-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-14 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl group-hover:border-emerald-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center group">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded transition-all duration-300 hover:scale-110"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-700 font-medium group-hover:text-emerald-600 transition-colors duration-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white py-4 rounded-2xl text-lg font-semibold transition-all duration-500 shadow-2xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-emerald-400/30 relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? "Signing in..." : "Sign in"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Enhanced Footer */}
          <div className="mt-10 text-center">
            <p className="text-slate-600 text-lg">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Enhanced Demo Credentials */}
          <div className="mt-8 p-6 bg-gradient-to-br from-slate-50/80 to-zinc-50/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-lg">
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-100/80 backdrop-blur-xl border border-emerald-200/50 rounded-full px-4 py-2 shadow-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 font-semibold text-sm">Demo Credentials</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-xs text-slate-500 font-medium mb-1">Email</div>
                <div className="text-sm text-slate-700 font-mono">demo@rentify.com</div>
              </div>
              <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-xs text-slate-500 font-medium mb-1">Password</div>
                <div className="text-sm text-slate-700 font-mono">demo123456</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

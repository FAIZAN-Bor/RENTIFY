"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, Settings, Calendar, ChevronDown, Sparkles, Car, Shield } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import LanguageSwitcher from "@/components/LanguageSwitcher"
import { useTranslation } from "@/hooks/useTranslation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useTranslation()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen)

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-2xl border-b border-gray-200/60 shadow-xl shadow-gray-900/8' 
        : 'bg-white/15 backdrop-blur-3xl border-b border-white/30 shadow-2xl shadow-black/25'
    }`}>
      {/* Enhanced gradient overlay with moving particles effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/8 via-cyan-500/8 to-violet-500/8 animate-gradient-x opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Enhanced Logo with better branding */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              {/* Main logo container with enhanced styling */}
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/20">
                <div className="relative">
                  <Car className="w-6 h-6 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3">
                    <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              </div>
              {/* Glowing ring effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500"></div>
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl animate-shimmer"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold transition-all duration-500 text-gray-900 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:via-cyan-500 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent">
                Rentify
              </span>
              <span className="text-xs font-medium transition-colors duration-500 text-black">
                Premium Car Rentals
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {[
              { href: "/", label: t("nav.home"), icon: null },
              { href: "/explore", label: t("nav.explore"), icon: null },
              { href: "/about", label: t("nav.about"), icon: null },
              { href: "/contact", label: t("nav.contact"), icon: null }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-6 py-3 rounded-xl font-semibold transition-all duration-500 group overflow-hidden text-black hover:text-black"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-90 transition-all duration-500 rounded-xl scale-0 group-hover:scale-100"></div>
                
                {/* Text content */}
                <span className="relative z-10 tracking-wide">{item.label}</span>
                
                {/* Animated underline */}
                <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-500 rounded-full"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 rounded-xl -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
              </Link>
            ))}
            <div className="ml-6 relative">
              <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                <LanguageSwitcher />
              </div>
            </div>
          </nav>

          {/* Enhanced Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-3 px-4 py-2.5 rounded-2xl transition-all duration-500 group overflow-hidden border text-black hover:text-black border-gray-200/50 hover:border-emerald-400/50 bg-white/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-500 group-hover:scale-110 border-2 border-white/30">
                      <span className="text-white text-sm font-bold">
                        {user.first_name ? user.first_name[0].toUpperCase() : user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-40 blur transition-all duration-500"></div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="font-semibold text-sm leading-tight">
                      {user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email}
                    </div>
                    <div className="text-xs opacity-75">Premium Member</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-all duration-500 ${isProfileMenuOpen ? 'rotate-180 scale-110' : ''}`} />
                </button>

                {/* Ultra Enhanced Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-white/98 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-200/60 py-3 animate-slide-up overflow-hidden">
                    {/* Header with gradient background */}
                    <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 border-b border-gray-200/50">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white">
                            <span className="text-white text-lg font-bold">
                              {user.first_name ? user.first_name[0].toUpperCase() : user.email[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Shield className="w-3 h-3 text-emerald-500" />
                            <span className="text-xs text-emerald-600 font-medium">Verified Account</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu items with enhanced styling */}
                    <div className="py-2">
                      {[
                        { href: "/profile", icon: User, label: "My Profile", desc: "Manage your account" },
                        { href: "/bookings", icon: Calendar, label: "My Bookings", desc: "View rental history" },
                        { href: "/settings", icon: Settings, label: "Settings", desc: "Preferences & security" }
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-6 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:via-cyan-50 hover:to-blue-50 hover:text-emerald-700 transition-all duration-300 group relative overflow-hidden"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-semibold">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.desc}</div>
                          </div>
                          <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200/50 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-6 py-4 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group relative overflow-hidden rounded-b-3xl"
                      >
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <LogOut className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-semibold">Sign Out</div>
                          <div className="text-xs text-red-400">Come back soon!</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/login" 
                  className="px-6 py-2.5 rounded-xl font-semibold transition-all duration-500 relative overflow-hidden group text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300"
                >
                  <span className="relative z-10">Log In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
                <Link 
                  href="/signup" 
                  className="px-8 py-2.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white font-bold rounded-xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 border border-emerald-400/30 relative overflow-hidden group"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
              </div>
            )}
          </div>

          {/* Ultra Enhanced Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-3 rounded-2xl transition-all duration-500 border relative overflow-hidden group text-black hover:text-black border-gray-200 hover:border-emerald-400 bg-white/50 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500"
          >
            <div className="relative w-6 h-6">
              <span className="absolute top-1 left-0 w-full h-0.5 bg-current transition-all duration-500 rounded-full"></span>
              <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 rounded-full ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className="absolute top-4 left-0 w-full h-0.5 bg-current transition-all duration-500 rounded-full"></span>
            </div>
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          </button>
        </div>

        {/* Ultra Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-gray-200/60 shadow-2xl animate-slide-up overflow-hidden">
            {/* Gradient background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-cyan-50/50 to-blue-50/50"></div>
            
            <nav className="relative container mx-auto px-4 py-8 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-2">
                {[
                  { href: "/", label: "Home", icon: null },
                  { href: "/explore", label: "Explore", icon: null },
                  { href: "/about", label: "About", icon: null },
                  { href: "/contact", label: "Contact", icon: null }
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-6 py-4 text-black hover:text-black hover:bg-gradient-to-r hover:from-emerald-500 hover:via-cyan-500 hover:to-blue-500 rounded-2xl font-semibold transition-all duration-500 relative overflow-hidden group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  </Link>
                ))}
              </div>
              
              {/* User Section */}
              <div className="pt-6 border-t border-gray-200/50">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info Card */}
                    <div className="flex items-center space-x-4 px-6 py-4 bg-gradient-to-r from-emerald-50 via-cyan-50 to-blue-50 rounded-2xl border border-gray-200/50">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-white">
                          <span className="text-white text-sm font-bold">
                            {user.first_name ? user.first_name[0].toUpperCase() : user.email[0].toUpperCase()}
                          </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Shield className="w-3 h-3 text-emerald-500" />
                          <span className="text-xs text-emerald-600 font-medium">Premium Member</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* User Menu Items */}
                    <div className="space-y-2">
                      {[
                        { href: "/profile", icon: User, label: "My Profile" },
                        { href: "/bookings", icon: Calendar, label: "My Bookings" },
                        { href: "/settings", icon: Settings, label: "Settings" }
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-6 py-4 text-gray-700 hover:text-emerald-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 rounded-2xl transition-all duration-500 group"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <item.icon className="w-5 h-5 text-emerald-600" />
                          </div>
                          <span className="font-semibold">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center w-full px-6 py-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-2xl transition-all duration-500 group"
                    >
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <LogOut className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="font-semibold">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link 
                      href="/login" 
                      className="block px-6 py-4 text-center text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl font-semibold transition-all duration-500 border border-gray-200 hover:border-emerald-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link 
                      href="/signup" 
                      className="block px-6 py-4 text-center bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-xl transition-all duration-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 hover:scale-105"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Language Switcher */}
              <div className="pt-4 border-t border-gray-200/50">
                <div className="px-6 py-4 bg-white/50 rounded-2xl border border-gray-200/50">
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

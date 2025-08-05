"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut, Settings, Calendar } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen)

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-zinc-900">Rentify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-zinc-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/explore" className="text-zinc-700 hover:text-green-600 transition-colors">
              Explore
            </Link>
            <Link href="/about" className="text-zinc-700 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-zinc-700 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 text-zinc-700 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-zinc-100"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.first_name ? user.first_name[0].toUpperCase() : user.email[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:inline">
                    {user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-200 py-2">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="flex items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      My Bookings
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <div className="border-t border-zinc-200 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-zinc-700 hover:text-green-600 transition-colors">
                  Log In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-zinc-700 hover:text-green-600 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-zinc-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="text-zinc-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/about"
                className="text-zinc-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-zinc-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-zinc-200">
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 px-2 py-1">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.first_name ? user.first_name[0].toUpperCase() : user.email[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-zinc-700">
                        {user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.email}
                      </span>
                    </div>
                    <Link
                      href="/profile"
                      className="text-zinc-700 hover:text-green-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/bookings"
                      className="text-zinc-700 hover:text-green-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link
                      href="/settings"
                      className="text-zinc-700 hover:text-green-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="text-left text-red-600 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/login"
                      className="text-zinc-700 hover:text-green-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="btn-primary text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

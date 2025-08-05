"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Car, Shield, Award, Clock } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,175,80,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6 group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white tracking-wide">Rentify</span>
                <div className="w-full h-0.5 bg-gradient-to-r from-emerald-400 to-transparent mt-1"></div>
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              {t("footer.desc")}
            </p>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center group/badge">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover/badge:scale-110 transition-transform duration-300">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs text-gray-400">Secure</span>
              </div>
              <div className="text-center group/badge">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover/badge:scale-110 transition-transform duration-300">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs text-gray-400">Trusted</span>
              </div>
              <div className="text-center group/badge">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover/badge:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-xs text-gray-400">24/7</span>
              </div>
            </div>

            {/* Enhanced Social Media */}
            <div className="flex space-x-4 pt-4">
              <div className="p-3 bg-gradient-to-br from-blue-600/20 to-blue-700/20 backdrop-blur-xl rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer group/social">
                <Facebook className="w-5 h-5 text-blue-400 group-hover/social:text-blue-300" />
              </div>
              <div className="p-3 bg-gradient-to-br from-sky-600/20 to-sky-700/20 backdrop-blur-xl rounded-xl border border-sky-500/20 hover:border-sky-400/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer group/social">
                <Twitter className="w-5 h-5 text-sky-400 group-hover/social:text-sky-300" />
              </div>
              <div className="p-3 bg-gradient-to-br from-pink-600/20 to-pink-700/20 backdrop-blur-xl rounded-xl border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer group/social">
                <Instagram className="w-5 h-5 text-pink-400 group-hover/social:text-pink-300" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative">
              {t("footer.quick_links")}
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
            </h3>
            <div className="space-y-3">
              <Link href="/" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.home")}
              </Link>
              <Link href="/explore" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.explore")}
              </Link>
              <Link href="/about" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.about")}
              </Link>
              <Link href="/contact" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.contact")}
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative">
              {t("footer.support")}
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
            </h3>
            <div className="space-y-3">
              <Link href="/help" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.help_center")}
              </Link>
              <Link href="/terms" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.terms_of_service")}
              </Link>
              <Link href="/privacy" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.privacy_policy")}
              </Link>
              <Link href="/faq" className="group flex items-center text-gray-300 hover:text-emerald-400 transition-all duration-300">
                <span className="w-0 h-0.5 bg-emerald-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                {t("footer.faq")}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative">
              {t("footer.contact_info")}
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="group flex items-start space-x-4 p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">Email</span>
                  <span className="text-white font-medium">support@rentify.com</span>
                </div>
              </div>
              <div className="group flex items-start space-x-4 p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">Phone</span>
                  <span className="text-white font-medium">+1 (555) 123-4567</span>
                </div>
              </div>
              <div className="group flex items-start space-x-4 p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300 hover:scale-105">
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-gray-400 text-sm block">Address</span>
                  <span className="text-white font-medium">{t("footer.address")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gradient-to-r from-transparent via-emerald-500/30 to-transparent">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-base font-medium">
                © {new Date().getFullYear()} Rentify. {t("footer.copyright")}
              </p>
              <div className="flex items-center space-x-2 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Trusted by 10,000+ customers worldwide</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-8">
              <Link href="/terms" className="relative text-gray-300 hover:text-emerald-400 text-sm font-medium transition-all duration-300 group">
                {t("footer.terms")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/privacy" className="relative text-gray-300 hover:text-emerald-400 text-sm font-medium transition-all duration-300 group">
                {t("footer.privacy")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/cookies" className="relative text-gray-300 hover:text-emerald-400 text-sm font-medium transition-all duration-300 group">
                {t("footer.cookies")}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

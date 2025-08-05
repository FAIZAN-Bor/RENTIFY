"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Hero3D from "@/components/Hero3D"
import CarCard from "@/components/CarCard"
import BackgroundCarousel from "@/components/BackgroundCarousel"
import { ArrowRight, Search, Shield, Clock, DollarSign, CheckCircle, Award } from "lucide-react"
import { carsApi } from "@/lib/api"
import type { Car } from "@/lib/api"
import { useTranslation } from "@/hooks/useTranslation"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [topRatedCars, setTopRatedCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  // Use translations for how it works steps and features, fallback to [] if not array
  const howItWorksSteps: any[] = Array.isArray((t("homepage.how_it_works.steps") as any)) ? (t("homepage.how_it_works.steps") as any) : []
  const features: any[] = Array.isArray((t("homepage.why.features") as any)) ? (t("homepage.why.features") as any) : []

  useEffect(() => {
    setIsVisible(true)
    fetchTopRatedCars()
  }, [])

  const fetchTopRatedCars = async () => {
    try {
      const response = await carsApi.getPopularCars()
      if (response.success && response.data) {
        const cars = response.data;
        setTopRatedCars(cars.slice(0, 3)) // Get top 3 cars
      }
    } catch (error) {
      console.error("Error fetching top rated cars:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {/* Hero Section with Dynamic Background */}
      <section className="dynamic-bg-carousel">
        <BackgroundCarousel />
        
        <div className="content-overlay">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col lg:flex-row items-center gap-12 min-h-screen justify-center">
              {/* Left side - Content */}
              <div className={`flex-1 space-y-8 max-w-2xl ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}> 
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight text-shadow-lg">
                  {t('homepage.heading')}
                </h1>
                <p className="text-2xl text-white/95 leading-relaxed text-shadow-md">
                  {t('homepage.subheading')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link href="/explore" className="btn-primary inline-flex items-center justify-center text-lg px-8 py-4 shadow-md hover:scale-105 transition-transform animate-glow">
                    {t('homepage.explore')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link href="/about" className="btn-outline inline-flex items-center justify-center text-lg px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    {t('homepage.learn_more')}
                  </Link>
                </div>
              </div>

              {/* Right side - 3D Animation */}
              <div className={`flex-1 flex items-center justify-center w-full max-w-xl mx-auto ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
                <div className="hero-glass p-8 animate-float">
                  <Hero3D />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">{t("homepage.top_rated.heading")}</h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              {t("homepage.top_rated.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              [...Array(3)].map((_, index) => (
                <div key={index} className="card p-6 animate-pulse">
                  <div className="bg-zinc-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="bg-zinc-200 h-6 rounded w-3/4"></div>
                    <div className="bg-zinc-200 h-4 rounded w-1/2"></div>
                    <div className="bg-zinc-200 h-4 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : topRatedCars.length > 0 ? (
              topRatedCars.map((car, index) => (
                <div key={car.car_id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CarCard car={car} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-zinc-400 text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">{t("homepage.top_rated.no_cars")}</h3>
                <p className="text-zinc-600">{t("homepage.top_rated.check_back")}</p>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/explore" className="btn-secondary inline-flex items-center">
              {t("homepage.top_rated.view_all")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Enhanced Professional Design */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-rose-400/5 to-orange-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-2xl mb-8 relative">
              <Search className="w-10 h-10 text-white drop-shadow-lg" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight">
              {t("homepage.how_it_works.heading")}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t("homepage.how_it_works.desc")}
            </p>
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step: any, index: number) => {
              const Icon = [Search, CheckCircle, Shield, Clock][index]
              const gradients = [
                'from-emerald-500 to-teal-600',
                'from-blue-500 to-indigo-600', 
                'from-purple-500 to-pink-600',
                'from-orange-500 to-red-600'
              ]
              const bgColors = [
                'from-emerald-50 to-teal-50',
                'from-blue-50 to-indigo-50',
                'from-purple-50 to-pink-50', 
                'from-orange-50 to-red-50'
              ]
              
              return (
                <div
                  key={index}
                  className="group relative animate-slide-up hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Main Card */}
                  <div className={`relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:border-white/50 group-hover:-translate-y-3`}>
                    {/* Floating number badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-white group-hover:scale-125 transition-transform duration-300 relative`}>
                        {index + 1}
                        <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[index]} opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    {/* Icon container with enhanced styling */}
                    <div className="relative mb-8 mt-4">
                      <div className={`w-24 h-24 bg-gradient-to-br ${gradients[index]} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 border-2 border-white/30`}>
                        <Icon className="w-12 h-12 text-white drop-shadow-lg" />
                      </div>
                      {/* Decorative ring */}
                      <div className={`absolute inset-0 w-24 h-24 mx-auto border-4 border-white/30 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-pulse scale-110`}></div>
                      
                      {/* Floating particles */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-lg">
                      {step.desc}
                    </p>
                    
                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${gradients[index]} rounded-b-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  </div>
                  
                  {/* Connection line to next step */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 z-10">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* Bottom CTA section */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-lg">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-gray-700 font-medium">Simple. Fast. Reliable.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Rentify Section - Enhanced Professional Design */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-gray-50 to-zinc-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-lg mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
              {t("homepage.why.heading")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("homepage.why.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature: any, index: number) => {
              const Icon = [DollarSign, Clock, Shield, Award][index]
              const gradients = [
                'from-emerald-500 to-teal-600',
                'from-blue-500 to-indigo-600',
                'from-purple-500 to-pink-600',
                'from-amber-500 to-orange-600'
              ]
              const bgColors = [
                'from-emerald-50 to-teal-50',
                'from-blue-50 to-indigo-50',
                'from-purple-50 to-pink-50',
                'from-amber-50 to-orange-50'
              ]
              const iconBgColors = [
                'from-emerald-100 to-teal-100',
                'from-blue-100 to-indigo-100',
                'from-purple-100 to-pink-100',
                'from-amber-100 to-orange-100'
              ]
              
              return (
                <div
                  key={index}
                  className="group relative animate-slide-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Main Feature Card */}
                  <div className={`relative bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-gray-300/80 group-hover:scale-105 group-hover:-translate-y-2`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[index]} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    {/* Icon container with enhanced styling */}
                    <div className="relative mb-8">
                      {/* Outer glow ring */}
                      <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${gradients[index]} rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-lg`}></div>
                      
                      {/* Main icon container */}
                      <div className={`relative w-20 h-20 bg-gradient-to-br ${iconBgColors[index]} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-3 border border-white/50`}>
                        <div className={`w-16 h-16 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center shadow-inner transition-transform duration-500 group-hover:scale-110`}>
                          <Icon className="w-9 h-9 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    
                    {/* Content with improved typography */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {feature.desc}
                      </p>
                    </div>
                    
                    {/* Bottom accent with animated gradient */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index]} rounded-b-3xl opacity-60 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100`}></div>
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-1000 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* Bottom enhanced CTA section */}
          <div className="text-center mt-20">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-800 font-semibold">Trusted by thousands worldwide</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

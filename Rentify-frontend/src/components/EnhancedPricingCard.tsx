"use client"

import { useState, useMemo, useEffect } from "react"
import { DollarSign, Check, TrendingDown, Filter, Award, Zap } from "lucide-react"
import { PricingOption, Website } from "@/lib/api"

interface EnhancedPricingCardProps {
  pricingOptions: PricingOption[]
  websites: Website[]
  providers?: Array<{ name: string; rating?: number }>
  carData?: {
    monthly_fee_without_tax: number
  }
  onFiltersChange?: (duration: number, mileage: number) => void
}

export default function EnhancedPricingCard({ 
  pricingOptions, 
  websites, 
  providers,
  carData,
  onFiltersChange 
}: EnhancedPricingCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<number>(12)
  const [selectedMileage, setSelectedMileage] = useState<number>(10000)
  const [priceChangeAnimation, setPriceChangeAnimation] = useState(false)

  // Get unique duration and mileage options
  const durationOptions = useMemo(() => 
    [...new Set(pricingOptions.map(p => p.duration_months))].sort((a, b) => a - b)
  , [pricingOptions])

  const mileageOptions = useMemo(() => 
    [...new Set(pricingOptions.map(p => p.annual_kms))].sort((a, b) => a - b)
  , [pricingOptions])

  // Filter pricing options based on selected criteria
  const filteredOptions = useMemo(() => {
    return pricingOptions.filter(option => 
      option.duration_months === selectedDuration && 
      option.annual_kms === selectedMileage
    )
  }, [pricingOptions, selectedDuration, selectedMileage])

  // Get minimum price from available providers
  const minPrice = useMemo(() => {
    if (filteredOptions.length === 0) {
      return carData?.monthly_fee_without_tax || 0
    }
    return Math.min(...filteredOptions.map(option => option.monthly_fee))
  }, [filteredOptions, carData])

  // Get provider details for minimum price
  const bestProvider = useMemo(() => {
    if (filteredOptions.length === 0) return null
    
    const bestOption = filteredOptions.find(option => option.monthly_fee === minPrice)
    if (!bestOption) return null

    const website = websites.find(w => w.website_id === bestOption.website_id)
    const provider = providers?.find(p => p.name === website?.name)
    
    return {
      option: bestOption,
      website,
      provider,
      savings: filteredOptions.length > 1 ? 
        Math.max(...filteredOptions.map(o => o.monthly_fee)) - minPrice : 0
    }
  }, [filteredOptions, minPrice, websites, providers])

  // Get all available providers for current filters
  const availableProviders = useMemo(() => {
    return filteredOptions.map(option => {
      const website = websites.find(w => w.website_id === option.website_id)
      const provider = providers?.find(p => p.name === website?.name)
      return {
        option,
        website,
        provider,
        isMinPrice: option.monthly_fee === minPrice
      }
    }).sort((a, b) => a.option.monthly_fee - b.option.monthly_fee)
  }, [filteredOptions, websites, providers, minPrice])

  // Initialize selectedDuration and selectedMileage with first available options
  useMemo(() => {
    if (durationOptions.length > 0 && !durationOptions.includes(selectedDuration)) {
      setSelectedDuration(durationOptions[0])
    }
    if (mileageOptions.length > 0 && !mileageOptions.includes(selectedMileage)) {
      setSelectedMileage(mileageOptions[0])
    }
  }, [durationOptions, mileageOptions])

  // Notify parent component about filter changes
  useEffect(() => {
    onFiltersChange?.(selectedDuration, selectedMileage)
  }, [selectedDuration, selectedMileage, onFiltersChange])

  // Trigger price change animation
  useEffect(() => {
    setPriceChangeAnimation(true)
    const timer = setTimeout(() => setPriceChangeAnimation(false), 600)
    return () => clearTimeout(timer)
  }, [minPrice])

  return (
    <div className="rounded-3xl shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 overflow-hidden backdrop-blur-sm relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl"></div>
      
      <div className="p-8 relative z-10">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              Rental Pricing
              {priceChangeAnimation && (
                <Zap className="w-6 h-6 ml-3 text-yellow-500 animate-pulse drop-shadow-lg" />
              )}
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              💰 Best Deals
            </div>
          </div>
          <p className="text-gray-600 text-lg">Compare prices from multiple providers and find the best deal</p>
        </div>
        
        {/* Enhanced Filter Controls */}
        <div className="bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-xl p-6 rounded-3xl mb-8 border border-white/50 shadow-xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                Customize Your Rental
              </h3>
              <div className="ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                ⚡ Smart Filter
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white text-xs">📅</span>
                  </div>
                  Rental Period
                  <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {durationOptions.length} options
                  </span>
                </label>
                <select
                  className="h-14 rounded-2xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg w-full px-5 text-sm font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-200/50 transition-all duration-300 hover:shadow-xl hover:border-gray-300"
                  value={selectedDuration}
                  onChange={e => {
                    const newDuration = Number(e.target.value)
                    setSelectedDuration(newDuration)
                    onFiltersChange?.(newDuration, selectedMileage)
                  }}
                >
                  {durationOptions.map(months => (
                    <option key={months} value={months}>
                      {months} month{months > 1 ? 's' : ''}
                      {months === 12 ? ' (1 year)' : months === 24 ? ' (2 years)' : months === 36 ? ' (3 years)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-2">
                    <span className="text-white text-xs">🛣️</span>
                  </div>
                  Annual Mileage
                  <span className="ml-2 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    {mileageOptions.length} options
                  </span>
                </label>
                <select
                  className="h-14 rounded-2xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg w-full px-5 text-sm font-semibold focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 transition-all duration-300 hover:shadow-xl hover:border-gray-300"
                  value={selectedMileage}
                  onChange={e => {
                    const newMileage = Number(e.target.value)
                    setSelectedMileage(newMileage)
                    onFiltersChange?.(selectedDuration, newMileage)
                  }}
                >
                  {mileageOptions.map(kms => (
                    <option key={kms} value={kms}>
                      {kms.toLocaleString()} km/year
                      {kms <= 10000 ? ' (Low)' : kms <= 20000 ? ' (Average)' : ' (High)'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {filteredOptions.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-100 via-emerald-50 to-teal-100 border-2 border-green-200 rounded-2xl shadow-lg">
                <div className="text-sm text-green-800 font-bold flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✅</span>
                  </div>
                  {filteredOptions.length} provider{filteredOptions.length > 1 ? 's' : ''} available for your selection
                  <div className="ml-auto bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Perfect Match!
                  </div>
                </div>
              </div>
            )}
            
            {filteredOptions.length === 0 && durationOptions.length > 0 && mileageOptions.length > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 via-yellow-50 to-red-100 border-2 border-orange-200 rounded-2xl shadow-lg">
                <div className="text-sm text-orange-800 font-bold flex items-center">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">⚠️</span>
                  </div>
                  No providers available for this combination. Try different options above.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Minimum Price Display */}
        <div className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 p-8 rounded-3xl text-white shadow-2xl mb-8 relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
          {/* Enhanced background decorations */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-16 translate-y-16 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm opacity-90 font-semibold">Best Monthly Price</div>
                  <div className="text-xs opacity-75">All-inclusive pricing</div>
                </div>
              </div>
              {bestProvider && bestProvider.savings > 0 && (
                <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-2xl shadow-lg">
                  <TrendingDown className="w-5 h-5 mr-2 text-white" />
                  <div className="text-sm font-bold text-white">Save €{bestProvider.savings.toFixed(0)}</div>
                </div>
              )}
            </div>
            
            {filteredOptions.length > 0 ? (
              <>
                <div className={`flex items-baseline mb-4 transition-all duration-500 ${
                  priceChangeAnimation ? 'transform scale-105' : ''
                }`}>
                  <span className="text-6xl font-black tracking-tight">€{minPrice.toFixed(0)}</span>
                  {minPrice % 1 !== 0 && <span className="text-3xl font-bold">.{(minPrice % 1).toFixed(1).slice(2)}</span>}
                  <span className="text-2xl font-semibold ml-2 opacity-90">/month</span>
                  {priceChangeAnimation && (
                    <span className="ml-3 text-2xl animate-bounce">✨</span>
                  )}
                </div>
                <div className="text-base opacity-90 mb-6 font-medium">+ VAT • Starting price</div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs opacity-80 mb-1 font-medium">Rental Period</div>
                      <div className="text-lg font-bold">{selectedDuration} months</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80 mb-1 font-medium">Annual Mileage</div>
                      <div className="text-lg font-bold">{selectedMileage.toLocaleString()} km</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-sm font-medium">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4" />
                    </div>
                    Comprehensive insurance
                  </div>
                  
                  {bestProvider && (
                    <div className="flex items-center text-sm font-medium">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <Award className="w-4 h-4" />
                      </div>
                      Best from {bestProvider.website?.name || 'provider'}
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm font-medium">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4" />
                    </div>
                    Maintenance included
                  </div>
                  
                  {availableProviders.length > 1 && (
                    <div className="flex items-center text-sm font-medium">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <Filter className="w-4 h-4" />
                      </div>
                      Compared {availableProviders.length} providers
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl font-black mb-2">€{carData?.monthly_fee_without_tax?.toFixed(0) || '---'}</div>
                <div className="text-base opacity-90 mb-6 font-medium">base price + VAT</div>
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-5 border border-yellow-400/30">
                  <div className="text-lg font-bold mb-2">
                    🔍 No providers available
                  </div>
                  <div className="text-sm opacity-90">
                    Try different rental period or mileage options above
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Enhanced Provider Comparison */}
        {availableProviders.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-indigo-800 bg-clip-text text-transparent">
                    Provider Comparison
                  </div>
                  <div className="text-sm text-gray-600">Smart pricing from verified providers</div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                {availableProviders.length} provider{availableProviders.length > 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-4 max-h-64 overflow-y-auto custom-scrollbar">
              {availableProviders.map(({ option, website, provider, isMinPrice }, index) => (
                <div 
                  key={`${option.website_id}-${index}`}
                  className={`group relative flex items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                    isMinPrice 
                      ? 'bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 border-emerald-300 shadow-lg shadow-emerald-200/50' 
                      : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300 hover:shadow-md hover:bg-white'
                  }`}
                >
                  {/* Animated background decoration for best price */}
                  {isMinPrice && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-green-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  <div className="flex items-center relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 shadow-lg ${
                      isMinPrice 
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600' 
                        : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}>
                      <span className={`text-xl font-bold ${isMinPrice ? 'text-white' : 'text-gray-600'}`}>
                        {website?.name?.charAt(0) || 'P'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className={`text-lg font-bold ${isMinPrice ? 'text-emerald-800' : 'text-gray-900'}`}>
                        {website?.name || `Provider ${option.website_id}`}
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        {provider?.rating && (
                          <div className="flex items-center">
                            <span className="text-yellow-500 text-sm mr-1">⭐</span>
                            <span className="text-sm font-semibold text-gray-600">{provider.rating.toFixed(1)}</span>
                          </div>
                        )}
                        {isMinPrice && (
                          <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                            🏆 Best Price
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end relative z-10">
                    <div className={`text-2xl font-black ${isMinPrice ? 'text-emerald-700' : 'text-gray-900'}`}>
                      €{option.monthly_fee.toFixed(0)}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">/month</div>
                    {!isMinPrice && (
                      <div className="text-sm text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded-lg">
                        +€{(option.monthly_fee - minPrice).toFixed(0)} more
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {availableProviders.length > 1 && bestProvider && (
              <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white text-lg">💡</span>
                  </div>
                  <div className="text-blue-800">
                    <div className="font-bold text-lg">Smart Savings Alert!</div>
                    <div className="text-sm">
                      You save <span className="font-bold text-emerald-600">€{bestProvider.savings.toFixed(0)} per month</span> by choosing {bestProvider.website?.name} 
                      instead of the most expensive option.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Enhanced No Options Available Message */}
        {filteredOptions.length === 0 && durationOptions.length > 0 && mileageOptions.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-300 rounded-3xl p-8 mb-8 shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
                  <span className="text-3xl">🔍</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-800">No Matching Options Found</div>
                  <div className="text-sm text-yellow-700">Let's find you the perfect alternative</div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-4 border border-yellow-200">
                <div className="text-lg font-bold text-yellow-800 mb-2">
                  Your current selection:
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-100 rounded-xl p-3">
                    <div className="text-sm font-semibold text-yellow-700">Rental Period</div>
                    <div className="text-lg font-bold text-yellow-800">{selectedDuration} months</div>
                  </div>
                  <div className="bg-orange-100 rounded-xl p-3">
                    <div className="text-sm font-semibold text-orange-700">Annual Mileage</div>
                    <div className="text-lg font-bold text-orange-800">{selectedMileage.toLocaleString()} km</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-5 border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center mr-3">
                    <span className="text-white text-lg">💡</span>
                  </div>
                  <div className="text-lg font-bold text-blue-800">Quick Solutions:</div>
                </div>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Try different rental periods or mileage options above
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Contact our team for custom pricing solutions
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    Check back later as new providers may become available
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Book Now Section */}
        <div className="space-y-4">
          <button 
            className={`group relative w-full h-16 text-xl font-bold rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${
              filteredOptions.length > 0
                ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-500 hover:via-green-500 hover:to-teal-600 text-white shadow-emerald-500/30 hover:shadow-emerald-500/50'
                : 'bg-gradient-to-r from-gray-400 to-gray-600 text-white cursor-not-allowed opacity-75'
            }`}
            disabled={filteredOptions.length === 0}
          >
            {/* Button background animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 flex items-center justify-center">
              {filteredOptions.length > 0 ? (
                <>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🚗</span>
                  </div>
                  <span>Book Now - €{minPrice.toFixed(0)}/month</span>
                  <div className="ml-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg">📞</span>
                  </div>
                  <span>Contact for Custom Quote</span>
                </>
              )}
            </div>
          </button>
          
          {filteredOptions.length > 0 && bestProvider && (
            <div className="text-center bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-4 border border-emerald-200">
              <div className="text-lg font-bold text-emerald-800 mb-1">
                🎉 Best offer from <span className="text-emerald-600">{bestProvider.website?.name}</span>
              </div>
              <div className="text-sm text-emerald-700">
                {bestProvider.savings > 0 && (
                  <span className="font-semibold">💰 Save €{bestProvider.savings.toFixed(0)}/month • </span>
                )}
                All-inclusive pricing with premium support
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

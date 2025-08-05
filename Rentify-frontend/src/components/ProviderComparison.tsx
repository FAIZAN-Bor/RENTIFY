"use client"

import { useState, useMemo } from "react"
import { Award, ExternalLink } from "lucide-react"
import { PricingOption, Website } from "@/lib/api"

interface ProviderComparisonProps {
  pricingOptions: PricingOption[]
  websites: Website[]
  providers?: Array<{ name: string; rating?: number }>
  selectedDuration: number
  selectedMileage: number
}

export default function ProviderComparison({ 
  pricingOptions, 
  websites, 
  providers,
  selectedDuration,
  selectedMileage 
}: ProviderComparisonProps) {
  // Filter pricing options based on selected criteria
  const filteredOptions = useMemo(() => {
    return pricingOptions.filter(option => 
      option.duration_months === selectedDuration && 
      option.annual_kms === selectedMileage
    )
  }, [pricingOptions, selectedDuration, selectedMileage])

  // Get minimum price for highlighting best deals
  const minPrice = useMemo(() => {
    if (filteredOptions.length === 0) return 0
    return Math.min(...filteredOptions.map(option => option.monthly_fee))
  }, [filteredOptions])

  // Get all website providers, even those without current pricing
  const allProviders = useMemo(() => {
    return websites.map(website => {
      const currentOption = filteredOptions.find(option => option.website_id === website.website_id)
      const provider = providers?.find(p => p.name === website.name)
      
      return {
        website,
        provider,
        currentOption,
        hasCurrentPricing: !!currentOption,
        isMinPrice: currentOption ? currentOption.monthly_fee === minPrice : false
      }
    })
  }, [websites, filteredOptions, providers, minPrice])

  if (allProviders.length === 0) {
    return null
  }

  return (
    <div className="rounded-3xl shadow-xl border-0 bg-white overflow-hidden">
      <div className="p-8">
        <div className="text-xl font-bold text-gray-900 flex items-center mb-4">
          <Award className="w-5 h-5 mr-2 text-yellow-500" />
          Available Providers
        </div>
        
        <div className="space-y-4">
          {allProviders.map(({ website, provider, currentOption, hasCurrentPricing, isMinPrice }) => (
            <div
              key={website.website_id}
              className={`flex flex-row items-center justify-between bg-white rounded-2xl border shadow-sm px-6 py-5 transition-all duration-200 ${
                isMinPrice 
                  ? 'border-green-300 bg-green-50 ring-1 ring-green-200' 
                  : hasCurrentPricing 
                    ? 'border-gray-200 hover:border-blue-300 hover:shadow-md' 
                    : 'border-gray-100 bg-gray-50'
              }`}
            >
              {/* Left: Provider Name and Info */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-bold text-lg text-gray-900 truncate">
                    {provider?.name || website.name}
                  </div>
                  {isMinPrice && (
                    <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full font-medium">
                      Best Deal
                    </span>
                  )}
                </div>
                <div className="text-gray-500 text-sm truncate">
                  {hasCurrentPricing 
                    ? `${selectedDuration} months • ${selectedMileage.toLocaleString()} km/year`
                    : 'Available for other terms'
                  }
                </div>
              </div>
              
              {/* Right: Price and Button */}
              <div className="flex flex-col items-end gap-2 min-w-[120px]">
                <div className={`text-xl font-bold ${
                  hasCurrentPricing ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {hasCurrentPricing && currentOption ? `€${currentOption.monthly_fee.toFixed(0)}` : 'Quote'}
                </div>
                <a
                  href={website.main_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold shadow-md transition-all text-sm ${
                    hasCurrentPricing
                      ? 'text-white bg-green-500 hover:bg-green-600'
                      : 'text-gray-600 bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {hasCurrentPricing ? 'Rent Now' : 'View Offers'}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-sm text-blue-800">
            <div className="font-semibold mb-1">
              Showing prices for {selectedDuration} months with {selectedMileage.toLocaleString()} km/year
            </div>
            <div className="text-blue-600">
              {filteredOptions.length > 0 
                ? `${filteredOptions.length} provider${filteredOptions.length > 1 ? 's' : ''} available for your selection`
                : 'No providers available for this combination. Try adjusting your filters.'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

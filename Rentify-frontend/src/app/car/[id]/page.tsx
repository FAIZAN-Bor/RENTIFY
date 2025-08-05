"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Users, Fuel, Settings, MapPin, Calendar, ExternalLink, ArrowLeft, Clock, DollarSign, Check, Award, Phone, Mail, Zap, Shield, Car, Palette, Gauge } from "lucide-react"
import { carsApi, CarWithDetails } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"
import EnhancedPricingCard from "@/components/EnhancedPricingCard"
import ProviderComparison from "@/components/ProviderComparison"

const TABS = ["Characteristics", "Equipment", "Services"];

export default function CarDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [carData, setCarData] = useState<CarWithDetails | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedTab, setSelectedTab] = useState("Characteristics")
  const [selectedDuration, setSelectedDuration] = useState(12)
  const [selectedMileage, setSelectedMileage] = useState(10000)

  const carId = parseInt(params.id as string)

  // Helper function to check if a value is not null/empty/undefined
  const hasValue = (value: any): boolean => {
    return value !== null && value !== undefined && value !== '' && value !== '-' && value !== 0
  }

  // Helper function to get car specifications with only non-null values
  const getAvailableSpecs = () => {
    const specs = carData?.specifications || {}
    const carProps = {
      seats: carData?.doors || specs.seats,
      fuel_type: carData?.fuel_type || specs.fuelType,
      transmission: carData?.transmission || specs.transmission,
      model_year_range: carData?.model_year_range || specs.year,
      doors: carData?.doors || specs.doors,
      maximum_horsepower: carData?.maximum_horsepower,
      maximum_speed: carData?.maximum_speed,
      fuel_capacity: carData?.fuel_capacity,
      color: carData?.color,
      tire_type: carData?.tire_type,
      energy_label: carData?.energy_label,
      eu_energy_label_class: carData?.eu_energy_label_class
    }
    
    return Object.entries(carProps).filter(([key, value]) => hasValue(value))
  }

  // Helper function to get characteristics data
  const getCharacteristics = () => {
    const enginePerformance = [
      { label: 'Engine', value: carData?.specifications?.engine },
      { label: 'Power', value: carData?.specifications?.power || (carData?.maximum_horsepower ? `${carData.maximum_horsepower} ${carData.maximum_horsepower_unit || 'HP'}` : null) },
      { label: 'Max Speed', value: carData?.maximum_speed ? `${carData.maximum_speed} ${carData.maximum_speed_unit || 'km/h'}` : carData?.specifications?.maxSpeed },
      { label: 'Fuel Type', value: carData?.fuel_type || carData?.specifications?.fuelType },
      { label: 'Transmission', value: carData?.transmission || carData?.specifications?.transmission },
      { label: 'Fuel Capacity', value: carData?.fuel_capacity ? `${carData.fuel_capacity} ${carData.fuel_capacity_unit || 'L'}` : null },
      { label: 'Energy Label', value: carData?.energy_label },
      { label: 'EU Energy Class', value: carData?.eu_energy_label_class }
    ].filter(item => hasValue(item.value))

    const dimensionsEfficiency = [
      { label: 'Doors', value: carData?.doors || carData?.specifications?.doors },
      { label: 'Seats', value: carData?.specifications?.seats },
      { label: 'Color', value: carData?.color },
      { label: 'Tire Type', value: carData?.tire_type },
      { label: 'Body Style', value: carData?.body_style || carData?.type },
      { label: 'Version', value: carData?.version },
      { label: 'Fuel Consumption', value: carData?.specifications?.fuelConsumption },
      { label: 'CO2 Emissions', value: carData?.specifications?.co2Emissions }
    ].filter(item => hasValue(item.value))

    return { enginePerformance, dimensionsEfficiency }
  }

  useEffect(() => {
    if (carId) {
      fetchCarDetails()
    }
  }, [carId])

  const fetchCarDetails = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await carsApi.getCarById(carId, true)
      if (response.success && response.data) {
        const carDetails = response.data;
        setCarData(carDetails);
      } else {
        setError(response.error || "Failed to fetch car details")
      }
    } catch (err) {
      setError("An error occurred while fetching car details")
      console.error("Error fetching car details:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading car details...</p>
        </div>
      </div>
    )
  }

  if (error || !carData) {
    return (
      <div className="pt-16 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-zinc-400 text-6xl mb-4">🚗</div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Car not found</h2>
          <p className="text-zinc-600 mb-4">{error || "The car you're looking for doesn't exist."}</p>
          <Link href="/explore" className="btn-primary">
            Back to Explore
          </Link>
        </div>
      </div>
    )
  }

  const carName = `${carData.make} ${carData.brand} ${carData.model}`.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header/Breadcrumb */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center text-sm mb-6">
            <ArrowLeft className="w-4 h-4 mr-2 text-green-400" />
            <Link href="/explore" className="hover:text-green-400 cursor-pointer transition-colors duration-200 font-medium">
              See more offers
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-3 flex-wrap">
                      {hasValue(carData.model_year_range) && (
                        <span className="bg-blue-50 text-blue-700 border-blue-200 font-semibold px-3 py-1 rounded-full text-sm border">
                          {carData.model_year_range}
                        </span>
                      )}
                      {hasValue(carData.type || carData.body_style) && (
                        <span className="bg-green-50 text-green-700 border-green-200 font-semibold px-3 py-1 rounded-full text-sm border">
                          {carData.type || carData.body_style}
                        </span>
                      )}
                      {hasValue(carData.brand) && (
                        <span className="bg-purple-50 text-purple-700 border-purple-200 font-semibold px-3 py-1 rounded-full text-sm border">
                          {carData.brand}
                        </span>
                      )}
                      {hasValue(carData.fuel_type) && (
                        <span className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold px-3 py-1 rounded-full text-sm border">
                          {carData.fuel_type}
                        </span>
                      )}
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                      {carName}
                    </h1>
                    <p className="text-gray-600 text-lg">Premium compact car with modern features</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-6 sm:mt-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        ✅ Available
                      </div>
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        🏆 Premium
                      </div>
                    </div>
                  </div>
                </div>
                {/* Car Image */}
                <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 rounded-2xl overflow-hidden mb-6 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
                  <Image
                    src={carData.images[selectedImage]?.image_url || "/placeholder.svg"}
                    alt={carName}
                    width={900}
                    height={500}
                    className="w-full h-96 object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {/* Car Gallery Thumbnails */}
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {carData.images.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedImage === index
                          ? "ring-3 ring-blue-500 shadow-lg scale-105"
                          : "hover:ring-2 hover:ring-blue-300 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <Image
                        src={image.image_url || "/placeholder.svg"}
                        alt={`Car view ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Specifications & Tabs */}
            {/* Vehicle Specifications Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Vehicle Specifications</h2>
                  <div className="flex items-center text-sm text-green-600 font-semibold">
                    <Check className="w-4 h-4 mr-1" /> Verified specs
                  </div>
                </div>
                
                {getAvailableSpecs().length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {hasValue(carData?.specifications?.seats || carData?.doors) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Users className="w-8 h-8 mb-2 text-blue-500 bg-blue-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.specifications?.seats || carData?.doors}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Seats</div>
                      </div>
                    )}
                    
                    {hasValue(carData?.fuel_type || carData?.specifications?.fuelType) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Fuel className="w-8 h-8 mb-2 text-green-600 bg-green-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.fuel_type || carData?.specifications?.fuelType}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Fuel Type</div>
                      </div>
                    )}
                    
                    {hasValue(carData?.transmission || carData?.specifications?.transmission) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Settings className="w-8 h-8 mb-2 text-purple-600 bg-purple-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.transmission || carData?.specifications?.transmission}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Transmission</div>
                      </div>
                    )}
                    
                    {hasValue(carData?.model_year_range || carData?.specifications?.year) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Calendar className="w-8 h-8 mb-2 text-orange-500 bg-orange-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.model_year_range || carData?.specifications?.year}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Model Year</div>
                      </div>
                    )}
                    
                    {hasValue(carData?.doors) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Car className="w-8 h-8 mb-2 text-indigo-500 bg-indigo-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.doors}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Doors</div>
                      </div>
                    )}
                    
                    {hasValue(carData?.color) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Palette className="w-8 h-8 mb-2 text-pink-500 bg-pink-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.color}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Color</div>
                      </div>
                    )}
                    
                    {hasValue(carData?.maximum_horsepower) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Zap className="w-8 h-8 mb-2 text-yellow-500 bg-yellow-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.maximum_horsepower} {carData?.maximum_horsepower_unit || 'HP'}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Power</div>
                      </div>
                    )}
                    
                    {hasValue(carData?.maximum_speed) && (
                      <div className="flex flex-col items-center bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                        <Gauge className="w-8 h-8 mb-2 text-red-500 bg-red-100 rounded-xl p-1" />
                        <div className="text-2xl font-extrabold text-gray-900 text-center break-words whitespace-normal">
                          {carData?.maximum_speed} {carData?.maximum_speed_unit || 'km/h'}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 text-center">Max Speed</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-lg mb-2">No specifications available</div>
                    <div className="text-gray-500 text-sm">Detailed specifications will be updated soon.</div>
                  </div>
                )}
              </div>
            </div>
            {/* Tab Bar and Tab Content */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex gap-4 border-b mb-8">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    className={`px-6 py-2 font-semibold rounded-full transition-colors text-base ${selectedTab === tab ? "bg-blue-600 text-white shadow-md" : "bg-zinc-900 text-gray-400"}`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {selectedTab === "Characteristics" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {(() => {
                    const { enginePerformance, dimensionsEfficiency } = getCharacteristics()
                    
                    return (
                      <>
                        {enginePerformance.length > 0 && (
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Engine & Performance</h3>
                            <div className="space-y-4">
                              {enginePerformance.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                                  <span className="text-gray-600 font-medium">{item.label}</span>
                                  <span className="font-bold text-gray-900">{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {dimensionsEfficiency.length > 0 && (
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Dimensions & Details</h3>
                            <div className="space-y-4">
                              {dimensionsEfficiency.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                                  <span className="text-gray-600 font-medium">{item.label}</span>
                                  <span className="font-bold text-gray-900">{item.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {enginePerformance.length === 0 && dimensionsEfficiency.length === 0 && (
                          <div className="col-span-2 text-center py-8">
                            <div className="text-gray-400 text-lg mb-2">No detailed characteristics available</div>
                            <div className="text-gray-500 text-sm">Detailed characteristics will be updated soon.</div>
                          </div>
                        )}
                      </>
                    )
                  })()}
                </div>
              )}
              {selectedTab === "Equipment" && (
                <div>
                  {carData.features && carData.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {carData.features.map((feature, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <div className="flex items-center mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <h4 className="font-semibold text-gray-900">{feature.category}</h4>
                          </div>
                          <p className="text-gray-600 text-sm">{feature.value}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-lg mb-2">No equipment details available</div>
                      <div className="text-gray-500 text-sm">Equipment details will be updated soon.</div>
                    </div>
                  )}
                </div>
              )}
              {selectedTab === "Services" && (
                <div>
                  {carData.websites && carData.websites.length > 0 ? (
                    <div className="space-y-6">
                      <div className="text-gray-700 mb-4">Available services from our trusted partners:</div>
                      {carData.websites.map((website, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{website.name}</h4>
                              <p className="text-gray-600 text-sm mt-1">Professional car rental services</p>
                              {website.url && (
                                <a 
                                  href={website.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-flex items-center"
                                >
                                  Visit website <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              )}
                            </div>
                            {website.logo_url && (
                              <Image 
                                src={website.logo_url} 
                                alt={`${website.name} logo`}
                                width={60}
                                height={40}
                                className="object-contain"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-lg mb-2">No service details available</div>
                      <div className="text-gray-500 text-sm">Service information will be updated soon.</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Pricing and Booking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Pricing Card */}
            <EnhancedPricingCard 
              pricingOptions={carData.pricing_options}
              websites={carData.websites}
              providers={carData.providers}
              carData={{ monthly_fee_without_tax: carData.monthly_fee_without_tax }}
            />

            {/* Provider Comparison */}
            {carData.websites && carData.websites.length > 0 && (
              <div className="rounded-3xl shadow-xl border-0 bg-white overflow-hidden">
                <div className="p-8">
                  <div className="text-xl font-bold text-gray-900 flex items-center mb-4">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Available Providers
                  </div>
                  <div className="space-y-4">
                    {carData.websites.map((site, idx) => {
                      const providerPricing = carData.pricing_options.filter(p => p.website_id === site.website_id);
                      const minMonthlyFee = providerPricing.length > 0 ? Math.min(...providerPricing.map(p => p.monthly_fee || 0)) : null;
                      const isBestDeal = minMonthlyFee === Math.min(...carData.pricing_options.map(p => p.monthly_fee || 0));
                      const provider = carData.providers?.find(p => p.name === site.name);
                      return (
                        <div
                          key={site.website_id}
                          className={`flex flex-row items-center justify-between bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 mb-4`}
                        >
                          {/* Left: Provider Name and Info */}
                          <div className="flex flex-col min-w-0">
                            <div className="font-bold text-lg text-gray-900 truncate">{provider?.name || site.name}</div>
                            <div className="text-gray-500 text-sm truncate">{minMonthlyFee ? 'Monthly rental' : ''}</div>
                          </div>
                          {/* Right: Price and Button */}
                          <div className="flex flex-col items-end gap-2 min-w-[120px]">
                            <div className="text-xl font-bold text-green-600">{minMonthlyFee !== null ? `€${minMonthlyFee}` : '--'}</div>
                            <a
                              href={site.main_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-6 py-2 rounded-full font-semibold text-white bg-green-500 hover:bg-green-600 shadow-md transition-all text-sm"
                            >
                              Rent Now
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

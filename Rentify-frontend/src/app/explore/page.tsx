"use client"

import { useState, useEffect } from "react"
import CarCard from "@/components/CarCard"
import { Search, SlidersHorizontal } from "lucide-react"
import { carsApi, Car } from "@/lib/api"

export default function ExplorePage() {
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  })
  const [filters, setFilters] = useState({
    priceRange: [0, 500] as [number, number],
    vehicleType: "",
    brand: "",
    transmission: "",
    fuelType: "",
    make: "",
    bodyStyle: "",
    sortBy: "car_id",
    sortOrder: "asc" as "asc" | "desc"
  })

  // Available filter options (these could be fetched from API)
  const filterOptions = {
    makes: ["Tesla", "BMW", "Audi", "Mercedes", "Toyota", "Honda", "Ford", "Volkswagen"],
    brands: ["Tesla", "BMW", "Audi", "Mercedes", "Toyota", "Honda", "Ford", "Volkswagen"],
    vehicleTypes: ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Wagon"],
    fuelTypes: ["Gasoline", "Electric", "Hybrid", "Diesel"],
    transmissions: ["Auto", "Manual"],
    bodyStyles: ["Sedan", "SUV", "Hatchback", "Convertible", "Coupe", "Wagon"]
  }

  // Fetch cars from API
  const fetchCars = async (searchParams = {}) => {
    setLoading(true)
    setError("")
    
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...searchParams,
        // Convert price range to min/max
        min_price: filters.priceRange[0] * 30, // Convert daily to monthly
        max_price: filters.priceRange[1] * 30,
        // Map filter names to API parameters
        body_style: filters.vehicleType || filters.bodyStyle,
        fuel_type: filters.fuelType,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      }

      // Remove empty values
      Object.keys(params).forEach(key => {
        if (params[key as keyof typeof params] === "" || 
            params[key as keyof typeof params] === undefined || 
            params[key as keyof typeof params] === null) {
          delete params[key as keyof typeof params]
        }
      })

      const response = await carsApi.getCars(params)
      
      if (response.success && response.data) {
        const { cars, pagination } = response.data
        setCars(cars || [])
        setFilteredCars(cars || [])
        if (pagination) {
          setPagination(prev => ({
            ...prev,
            ...pagination
          }))
        }
      } else {
        setError(response.error || "Failed to fetch cars")
      }
    } catch (err) {
      setError("An error occurred while fetching cars")
      console.error("Error fetching cars:", err)
    } finally {
      setLoading(false)
    }
  }

  // Search cars
  const searchCars = async (query: string) => {
    if (!query.trim()) {
      fetchCars()
      return
    }

    setLoading(true)
    try {
      const response = await carsApi.searchCars(query)
      if (response.success && response.data) {
        setCars(response.data)
        setFilteredCars(response.data)
      } else {
        setError(response.error || "Search failed")
      }
    } catch (err) {
      setError("Search failed")
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchCars()
  }, [])

  // Handle filter changes
  useEffect(() => {
    fetchCars(filters)
  }, [filters.vehicleType, filters.brand, filters.transmission, filters.fuelType, 
      filters.make, filters.bodyStyle, filters.sortBy, filters.sortOrder])

  // Handle price range changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCars(filters)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [filters.priceRange])

  const handleFilterChange = (key: string, value: string | number | number[]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    searchCars(searchQuery)
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      vehicleType: "",
      brand: "",
      transmission: "",
      fuelType: "",
      make: "",
      bodyStyle: "",
      sortBy: "car_id",
      sortOrder: "asc"
    })
    setSearchQuery("")
    fetchCars()
  }

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
    fetchCars({ ...filters, page: newPage })
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="mb-12 text-center animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 relative">
            <Search className="w-10 h-10 text-white drop-shadow-lg" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight">
            Explore Cars
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find the perfect car for your next adventure from our extensive collection of premium vehicles.
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by make, model, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl group-focus-within:shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <button
              type="submit"
              className="btn-primary px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn-outline px-6 py-4 md:hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="flex gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`w-80 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl sticky top-24">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-8">
                {/* Enhanced Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Price Range (per day)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleFilterChange("priceRange", [0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-lg appearance-none cursor-pointer range-slider"
                    />
                    <div className="flex justify-between text-sm font-medium text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded-lg">$0</span>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg">${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Make */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Make</label>
                  <select
                    value={filters.make}
                    onChange={(e) => handleFilterChange("make", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <option value="">All Makes</option>
                    {filterOptions.makes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>

                {/* Enhanced Brand */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => handleFilterChange("brand", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <option value="">All Brands</option>
                    {filterOptions.brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Enhanced Vehicle Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Vehicle Type</label>
                  <select
                    value={filters.vehicleType}
                    onChange={(e) => handleFilterChange("vehicleType", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <option value="">All Types</option>
                    {filterOptions.vehicleTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Enhanced Transmission */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Transmission</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange("transmission", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <option value="">All</option>
                    {filterOptions.transmissions.map(transmission => (
                      <option key={transmission} value={transmission}>{transmission}</option>
                    ))}
                  </select>
                </div>

                {/* Enhanced Fuel Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => handleFilterChange("fuelType", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                  >
                    <option value="">All</option>
                    {filterOptions.fuelTypes.map(fuelType => (
                      <option key={fuelType} value={fuelType}>{fuelType}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Car Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg">
              <p className="text-gray-700 font-medium text-lg">
                {loading ? "Loading..." : `Showing ${filteredCars.length} of ${pagination.total} cars`}
              </p>
              <select 
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-')
                  handleFilterChange("sortBy", sortBy)
                  handleFilterChange("sortOrder", sortOrder)
                }}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl font-medium"
              >
                <option value="monthly_fee_without_tax-asc">Price: Low to High</option>
                <option value="monthly_fee_without_tax-desc">Price: High to Low</option>
                <option value="brand-asc">Brand: A to Z</option>
                <option value="brand-desc">Brand: Z to A</option>
                <option value="car_id-desc">Newest First</option>
              </select>
            </div>

            {error && (
              <div className="mb-8 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 rounded-2xl shadow-lg">
                <p className="text-red-700 font-medium text-lg">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-8 animate-pulse shadow-xl">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-48 rounded-2xl mb-6"></div>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 rounded-lg w-3/4"></div>
                      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 rounded-lg w-1/2"></div>
                      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 rounded-lg w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCars.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredCars.map((car, index) => (
                    <div key={car.car_id} className="animate-slide-up hover:scale-105 transition-all duration-500" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-16 flex justify-center">
                    <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-2 shadow-xl">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                        className="px-6 py-3 border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 font-medium"
                      >
                        Previous
                      </button>
                      {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                        const page = i + 1
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-3 border-2 rounded-xl font-medium transition-all duration-300 ${
                              pagination.page === page
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-lg"
                                : "border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      })}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                        className="px-6 py-3 border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 font-medium"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-8">🚗</div>
                <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-12 shadow-2xl max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No cars found</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Try adjusting your filters or search terms to find more cars.
                  </p>
                  <button onClick={clearFilters} className="btn-primary shadow-xl hover:shadow-2xl transition-all duration-300">
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

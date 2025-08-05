import Image from "next/image"
import Link from "next/link"
import { Users, Fuel, Settings, MapPin } from "lucide-react"

interface CarCardProps {
  car: {
    car_id: number
    make: string
    brand: string
    model: string
    version?: string
    fuel_type: string
    transmission: string
    body_style: string
    type: string
    monthly_fee_without_tax: number
    images?: Array<{ image_url: string }>
    // For backward compatibility with existing hardcoded data
    id?: string
    name?: string
    image?: string
    pricePerDay?: number
    seats?: number
    fuelType?: string
  }
}

export default function CarCard({ car }: CarCardProps) {
  // Use real data if available, fallback to legacy format
  const carId = car.car_id || parseInt(car.id || "0")
  const carName = car.name || `${car.make} ${car.brand} ${car.model}`.trim()
  const carImage = car.images?.[0]?.image_url || car.image || "/placeholder.svg"
  const pricePerDay = car.pricePerDay || Math.round(car.monthly_fee_without_tax / 30) || 0
  const seats = car.seats || 5
  const fuelType = car.fuelType || car.fuel_type
  const transmission = car.transmission
  const bodyStyle = car.type || car.body_style

  return (
    <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-200/50 overflow-hidden group hover:scale-[1.03] transition-all duration-500 max-w-sm mx-auto backdrop-blur-sm">
      <div className="relative overflow-hidden">
        {/* Gradient overlay for better visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
        
        <Image
          src={carImage}
          alt={carName}
          width={400}
          height={260}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Enhanced badge with better styling */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-2xl shadow-blue-500/30 backdrop-blur-sm border border-white/20">
          {bodyStyle}
        </div>
        
        {/* Location badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-xl text-xs font-medium shadow-lg border border-gray-200/50 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          Available
        </div>
        
        {/* Enhanced overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-8 space-y-6">
        {/* Enhanced header section with better spacing */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1 leading-tight">
              {carName}
            </h3>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
              {car.brand}
            </p>
            <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">
              Premium
            </span>
          </div>
        </div>

        {/* Enhanced specifications grid with better alignment and icons */}
        <div className="grid grid-cols-3 gap-4 py-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl border border-gray-100">
          <div className="flex flex-col items-center text-center space-y-2 p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-gray-800">{seats}</span>
              <span className="text-xs text-gray-500 block">Seats</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2 p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Fuel className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-gray-800 line-clamp-1">{fuelType}</span>
              <span className="text-xs text-gray-500 block">Fuel</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-2 p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-0.5">
              <span className="text-sm font-bold text-gray-800 line-clamp-1">{transmission}</span>
              <span className="text-xs text-gray-500 block">Trans</span>
            </div>
          </div>
        </div>

        {/* Enhanced pricing and action section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col space-y-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                ${pricePerDay}
              </span>
              <span className="text-sm text-gray-500 font-medium">/day</span>
            </div>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-lg">
              Best Price
            </span>
          </div>
          
          <Link 
            href={`/car/${carId}`} 
            className="group/btn bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-blue-500/25 border border-blue-500/20 relative overflow-hidden"
          >
            <span className="relative z-10">View Details</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
          </Link>
        </div>
      </div>
    </div>
  )
}

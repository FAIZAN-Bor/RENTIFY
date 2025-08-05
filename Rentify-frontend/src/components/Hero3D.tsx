"use client"

// Simple fallback component to avoid React Three Fiber compatibility issues
function Hero3D() {
  return (
    <div className="w-full h-[32rem] min-h-[700px] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 rounded-lg px-4 py-8">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-64 h-32 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <span className="text-white font-bold text-7xl">R</span>
          </div>
          {/* Animated rings */}
          <div className="absolute inset-y-0 left-0 right-0 rounded-full border-4 border-green-200 animate-ping opacity-75"></div>
          <div className="absolute inset-y-3 left-3 right-3 rounded-full border-2 border-blue-200 animate-pulse"></div>
        </div>
        <div className="space-y-3 mt-8">
          <h3 className="text-3xl font-bold text-zinc-900">Rentify</h3>
        </div>
      </div>
    </div>
  )
}

export default Hero3D

import Image from "next/image"
import { Users, Target, Award, Globe, CheckCircle } from "lucide-react"

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Former automotive industry executive with 15+ years of experience in car rental and mobility solutions.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Tech entrepreneur and software architect specializing in travel and transportation platforms.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Operations expert with extensive background in logistics and customer service optimization.",
  },
  {
    name: "David Kim",
    role: "Head of Partnerships",
    image: "/placeholder.svg?height=300&width=300",
    bio: "Business development leader with strong relationships across the global car rental industry.",
  },
]

const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "We prioritize our customers' needs and strive to exceed their expectations in every interaction.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "We connect travelers with rental options worldwide, making mobility accessible everywhere.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "We maintain high standards by partnering only with trusted, verified rental providers.",
  },
  {
    icon: Users,
    title: "Innovation",
    description: "We continuously innovate to simplify the car rental process and enhance user experience.",
  },
]

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 relative">
              <Award className="w-10 h-10 text-white drop-shadow-lg" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight">
              About Rentify
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We&apos;re revolutionizing the car rental industry by connecting travelers with the best rental deals from
              trusted providers worldwide. Our mission is to make car rental simple, transparent, and accessible to
              everyone.
            </p>
            <div className="flex justify-center mt-8">
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Vision */}
      <section className="py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-8">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To democratize car rental by providing a single platform where travelers can compare, choose, and book
                from the world&apos;s leading rental providers. We believe everyone deserves access to reliable, affordable
                transportation, no matter where their journey takes them.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2020, Rentify has grown from a simple idea to a comprehensive platform serving millions of
                travelers worldwide. We&apos;re proud to have facilitated over 2 million successful car rentals and counting.
              </p>
              
              {/* Bottom enhanced CTA section */}
              <div className="mt-8">
                <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">Trusted by millions worldwide</span>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl p-4 shadow-2xl">
                <Image
                  src="/images/aboutus_image.jpg"
                  alt="About Rentify - Our team and mission"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none"></div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-80 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg mb-8">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core values guide everything we do and shape how we serve our customers and partners.
            </p>
            <div className="flex justify-center mt-6">
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
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
                  key={value.title}
                  className="group text-center animate-slide-up hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Main Value Card */}
                  <div className={`relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:border-white/50 group-hover:-translate-y-3`}>
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[index]} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    {/* Icon container with enhanced styling */}
                    <div className="relative mb-8">
                      {/* Outer glow ring */}
                      <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${gradients[index]} rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-lg`}></div>
                      
                      {/* Main icon container */}
                      <div className={`relative w-20 h-20 bg-gradient-to-br ${gradients[index]} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:rotate-3 border border-white/50`}>
                        <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                      
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    
                    {/* Content with improved typography */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {value.description}
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
        </div>
      </section>

      {/* Enhanced Stats */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "2M+", label: "Successful Rentals", delay: "0s" },
              { number: "500+", label: "Partner Providers", delay: "0.1s" },
              { number: "150+", label: "Countries Served", delay: "0.2s" },
              { number: "500K+", label: "Happy Customers", delay: "0.3s" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="group animate-slide-up"
                style={{ animationDelay: stat.delay }}
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/20">
                  <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {stat.label}
                  </div>
                  {/* Bottom accent line */}
                  <div className="mt-4 w-16 h-1 bg-gradient-to-r from-white/60 to-white/30 rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom enhanced CTA section */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold text-lg">Leading the industry since 2020</span>
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

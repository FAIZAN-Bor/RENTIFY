"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
    alert(t("contact.success"))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
              <Mail className="w-10 h-10 text-white drop-shadow-lg" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 leading-tight">
              {t("contact.heading")}
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Have questions or need assistance? We&apos;re here to help! Reach out to our friendly support team.
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

      <section className="py-24 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-80 h-80 bg-gradient-to-br from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Information */}
            <div className="space-y-8">
              <div className="animate-slide-up">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-8">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Whether you have questions about our service, need help with a booking, or want to partner with us,
                  we&apos;d love to hear from you.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    description: "Send us an email and we'll respond within 24 hours.",
                    contact: "support@rentify.com",
                    href: "mailto:support@rentify.com",
                    bgColor: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    linkColor: "text-emerald-600 hover:text-emerald-700"
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    description: "Speak directly with our support team.",
                    contact: "+1 (555) 123-4567",
                    href: "tel:+15551234567",
                    bgColor: "bg-blue-100",
                    iconColor: "text-blue-600",
                    linkColor: "text-blue-600 hover:text-blue-700"
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    description: "Come visit our headquarters.",
                    contact: "123 Rental Street\nSan Francisco, CA 94105\nUnited States",
                    bgColor: "bg-purple-100",
                    iconColor: "text-purple-600"
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    description: "Monday - Friday: 8:00 AM - 8:00 PM PST\nSaturday: 9:00 AM - 6:00 PM PST\nSunday: 10:00 AM - 4:00 PM PST",
                    bgColor: "bg-yellow-100",
                    iconColor: "text-yellow-600"
                  }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={index} 
                      className="flex items-start space-x-6 group animate-slide-up hover:scale-105 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <Icon className={`w-8 h-8 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-3 leading-relaxed whitespace-pre-line group-hover:text-gray-700 transition-colors duration-300">
                          {item.description}
                        </p>
                        {item.href ? (
                          <a href={item.href} className={`font-semibold ${item.linkColor} transition-colors duration-300`}>
                            {item.contact}
                          </a>
                        ) : item.contact && (
                          <div className="text-gray-600 font-medium whitespace-pre-line">
                            {item.contact}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-lg mb-6">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600">We'd love to hear from you</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                        {t("contact.name")} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                        {t("contact.email")} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("contact.subject")} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl"
                    >
                      <option value="">{t("contact.select_subject")}</option>
                      <option value="general">{t("contact.subjects.general")}</option>
                      <option value="booking">{t("contact.subjects.booking")}</option>
                      <option value="technical">{t("contact.subjects.technical")}</option>
                      <option value="partnership">{t("contact.subjects.partnership")}</option>
                      <option value="feedback">{t("contact.subjects.feedback")}</option>
                      <option value="other">{t("contact.subjects.other")}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                      {t("contact.message")} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl resize-vertical"
                      placeholder={t("contact.message") + "..."}
                    />
                  </div>

                  <button type="submit" className="w-full btn-primary flex items-center justify-center gap-3 text-lg py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <Send className="w-5 h-5" />
                    {t("contact.send")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/8 to-pink-400/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg mb-8">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Quick answers to common questions about Rentify.
              </p>
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {[
                {
                  question: "How does Rentify work?",
                  answer: "Rentify is a car rental aggregator that compares prices and options from multiple rental providers. Simply search for your desired location and dates, compare available cars, and book directly with your chosen provider."
                },
                {
                  question: "Is it free to use Rentify?",
                  answer: "Yes! Rentify is completely free for customers. We earn a small commission from our partner rental providers when you complete a booking, but this doesn't affect the price you pay."
                },
                {
                  question: "Can I cancel or modify my booking?",
                  answer: "Cancellation and modification policies vary by rental provider. You can find specific terms and conditions for your booking in your confirmation email or by contacting the rental provider directly."
                },
                {
                  question: "What if I have issues with my rental?",
                  answer: "While you book through Rentify, your rental agreement is with the provider. For immediate assistance during your rental, contact the provider directly. For other concerns, our support team is here to help mediate and resolve issues."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {faq.answer}
                  </p>
                  {/* Bottom accent line */}
                  <div className="mt-6 w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full opacity-60 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>
                </div>
              ))}
            </div>

            {/* Bottom enhanced CTA section */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-xl border border-white/30 rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-semibold text-lg">Still have questions? We're here to help!</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

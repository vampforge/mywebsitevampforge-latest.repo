"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Calendar, User, Mail, Phone, Building, MessageSquare, Send } from "lucide-react"

export default function ScheduleCallForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectBrief: "",
    callTime: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectBrief: "",
        callTime: "",
      })
    }, 3000)
  }

  return (
    <section id="schedule" ref={sectionRef} className="py-20 bg-black light:bg-white" data-cms-section="schedule-form">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16" data-animate="fade-up">
            <h2
              className="text-5xl md:text-6xl font-bold mb-8 text-white light:text-gray-900 font-syne"
              data-editable="schedule-title"
            >
              Schedule a Call with Us
            </h2>
            <p
              className="text-xl text-gray-300 light:text-gray-600 max-w-2xl mx-auto leading-relaxed"
              data-editable="schedule-description"
            >
              Ready to discuss your project? Book a free consultation call and let's explore how we can help bring your
              vision to life.
            </p>
          </div>

          <div
            className="bg-white/5 light:bg-gray-900/5 border border-white/10 light:border-gray-900/10 rounded-3xl p-8 md:p-12"
            data-animate="zoom-in"
          >
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-3xl font-bold text-white light:text-gray-900 mb-4 font-syne">Thank You!</h3>
                <p className="text-gray-300 light:text-gray-600 text-lg">
                  We've received your request and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">Company</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                    Preferred Call Time
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="datetime-local"
                      name="callTime"
                      value={formData.callTime}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                    Project Brief
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="projectBrief"
                      value={formData.projectBrief}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600 resize-none"
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group bg-gradient-to-r from-violet-500 to-cyan-400 text-black px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Booking..." : "Book Now"}
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

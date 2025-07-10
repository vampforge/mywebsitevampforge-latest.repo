"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Mail, Phone, MessageSquare, Send, Linkedin, Instagram } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
        message: "",
      })
    }, 3000)
  }

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
    { icon: MessageSquare, href: "https://wa.me/917464003631", label: "WhatsApp", color: "hover:text-green-400" },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-black light:bg-white" data-cms-section="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-animate="fade-up">
            <h2
              className="text-5xl md:text-6xl font-bold mb-8 text-white light:text-gray-900 font-syne"
              data-editable="contact-title"
            >
              Let's Talk
            </h2>
            <p
              className="text-xl text-gray-300 light:text-gray-600 max-w-3xl mx-auto leading-relaxed"
              data-editable="contact-description"
            >
              Ready to start your project? Get in touch and let's create something amazing together.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div data-animate="slide-left">
              <div className="bg-white/5 light:bg-gray-900/5 border border-white/10 light:border-gray-900/10 rounded-3xl p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-3xl font-bold text-white light:text-gray-900 mb-4 font-syne">Message Sent!</h3>
                    <p className="text-gray-300 light:text-gray-600 text-lg">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600"
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600"
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 light:text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600 resize-none"
                        placeholder="Tell us about your project..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-violet-500 to-cyan-400 text-black py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div data-animate="slide-right">
              <div className="space-y-8">
                <div>
                  <h3
                    className="text-3xl font-bold text-white light:text-gray-900 mb-8 font-syne"
                    data-editable="contact-info-title"
                  >
                    Get in Touch
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="text-gray-400 light:text-gray-600 text-sm">Email</p>
                        <a
                          href="mailto:vampforgee@gmail.com"
                          className="text-white light:text-gray-900 text-lg font-semibold hover:text-violet-400 transition-colors"
                          data-editable="contact-email"
                        >
                          vampforgee@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="text-gray-400 light:text-gray-600 text-sm">Phone</p>
                        <a
                          href="tel:+917464003631"
                          className="text-white light:text-gray-900 text-lg font-semibold hover:text-violet-400 transition-colors"
                          data-editable="contact-phone"
                        >
                          +91 7464003631
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white light:text-gray-900 mb-4 font-syne">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-xl flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:border-violet-400/50`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-gradient-to-r from-green-500/20 to-green-400/20 border border-green-400/30 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-white light:text-gray-900 mb-2 font-syne">Quick Chat?</h4>
                  <p className="text-gray-300 light:text-gray-600 mb-4">
                    Need immediate assistance? Message us on WhatsApp for quick responses.
                  </p>
                  <a
                    href="https://wa.me/917464003631"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

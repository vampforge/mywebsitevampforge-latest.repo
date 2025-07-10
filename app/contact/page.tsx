"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Mail, Phone, User, Calendar, MessageSquare, Send } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const pageRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    meetingType: "",
    projectStage: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".fade-in",
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".form-field",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 70%",
          },
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="fade-in text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="fade-in text-xl max-w-3xl mx-auto">
            Whether you're launching, rebranding, or scaling—we're here to help. Let's turn your vision into reality.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="fade-in text-4xl font-bold mb-6 text-gray-900">
                Let's Connect and Build Something Awesome
              </h2>
              <p className="fade-in text-lg text-gray-600 max-w-2xl mx-auto">
                At VampForge, we believe great digital solutions start with great conversations. Fill out the form below
                to schedule a free 30-minute discovery call.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form bg-gray-50 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company / Brand Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                  <select
                    name="meetingType"
                    value={formData.meetingType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="">Select meeting type</option>
                    <option value="video">Video Call (Google Meet / Zoom)</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person (if local)</option>
                  </select>
                </div>
              </div>

              <div className="form-field mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Stage</label>
                <select
                  name="projectStage"
                  value={formData.projectStage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="">Select project stage</option>
                  <option value="exploring">Just Exploring</option>
                  <option value="planning">Planning & Strategy</option>
                  <option value="ready">Ready to Start</option>
                </select>
              </div>

              <div className="form-field mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell Us Briefly About Your Project
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                    placeholder="Describe your project, goals, and any specific requirements..."
                  />
                </div>
              </div>

              <div className="form-field text-center">
                <button
                  type="submit"
                  className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  Submit Request
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="text-center mt-8 p-6 bg-green-50 rounded-xl">
              <h3 className="text-lg font-semibold text-green-800 mb-2">🎉 What happens next?</h3>
              <p className="text-green-700">
                We'll review your request and get back to you within 24 hours to confirm your call or meeting with the
                VampForge team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="fade-in text-4xl font-bold mb-12 text-center text-gray-900">Other Ways to Reach Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="fade-in text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Email</h3>
                <p className="text-gray-600">vampforgee@gmail.com</p>
              </div>

              <div className="fade-in text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Phone</h3>
                <p className="text-gray-600">7464003631</p>
              </div>

              <div className="fade-in text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Founder</h3>
                <p className="text-gray-600">Aman Jaiswal</p>
              </div>
            </div>

            <div className="fade-in text-center mt-12 p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Remote Consultations Available</h3>
              <p className="text-gray-600">
                We work remotely but are available for virtual consultations or local meetups on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

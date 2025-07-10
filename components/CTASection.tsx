"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowRight, Mail, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Floating sparkles animation
      gsap.to(".cta-sparkle", {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="animate-section py-20 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10"></div>

      {/* Floating Sparkles */}
      <div className="absolute top-20 left-20 cta-sparkle opacity-30">
        <Sparkles className="text-green-400 w-6 h-6" />
      </div>
      <div className="absolute top-40 right-20 cta-sparkle opacity-30">
        <Sparkles className="text-blue-400 w-8 h-8" />
      </div>
      <div className="absolute bottom-20 left-1/4 cta-sparkle opacity-30">
        <Sparkles className="text-green-400 w-4 h-4" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="cta-content text-4xl md:text-6xl font-bold mb-8 text-white">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Transform</span>{" "}
            Your Brand?
          </h2>
          <p className="cta-content text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let's create something extraordinary together. Whether you're launching a new venture or scaling an existing
            business, we're here to bring your vision to life.
          </p>

          <div className="cta-content flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/contact"
              className="magnetic-btn group bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-400/25"
            >
              Start Your Project
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/portfolio"
              className="magnetic-btn group border-2 border-green-400/50 hover:border-green-400 text-green-400 hover:text-black hover:bg-green-400 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              View Our Work
            </Link>
          </div>

          {/* Newsletter Signup */}
          <div className="cta-content max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest insights on design, development, and digital marketing</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="magnetic-btn bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-400/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

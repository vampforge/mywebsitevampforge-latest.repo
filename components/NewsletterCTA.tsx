"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Mail, Send, Sparkles } from "lucide-react"

export default function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")

    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-900/50 via-black to-violet-900/20 light:from-gray-50 light:via-white light:to-violet-100 relative overflow-hidden"
      data-cms-section="newsletter"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 opacity-20">
        <Sparkles className="text-cyan-400 w-8 h-8 animate-bounce" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto" data-animate="fade-up">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 text-white light:text-gray-900 font-syne"
            data-editable="newsletter-title"
          >
            Get Marketing Tips,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Free</span>
          </h2>
          <p className="text-xl text-gray-300 light:text-gray-600 mb-8" data-editable="newsletter-description">
            No spam. Just value. Get the latest insights, tips, and strategies delivered to your inbox.
          </p>

          {isSubmitted ? (
            <div className="bg-white/10 light:bg-gray-900/10 border border-violet-400/50 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white light:text-gray-900 mb-2 font-syne">Thank You!</h3>
              <p className="text-gray-300 light:text-gray-600">
                You've been successfully subscribed to our newsletter.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-violet-500 to-cyan-400 text-black px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

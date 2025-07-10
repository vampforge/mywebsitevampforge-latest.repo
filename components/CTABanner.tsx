"use client"

import { useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-violet-900/20 via-black to-cyan-900/20 light:from-violet-100 light:via-white light:to-cyan-100 relative overflow-hidden"
      data-cms-section="cta-banner"
      data-parallax
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-400/10"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="text-violet-400 w-8 h-8 animate-pulse" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="w-16 h-16 border-2 border-cyan-400/30 rounded-full animate-spin-slow"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto" data-animate="zoom-in">
          <h2
            className="text-5xl md:text-6xl font-bold mb-8 text-white light:text-gray-900 font-syne"
            data-editable="cta-headline"
          >
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              Incredible
            </span>{" "}
            Together
          </h2>
          <p
            className="text-xl text-gray-300 light:text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            data-editable="cta-description"
          >
            Ready to transform your brand and accelerate your growth? Let's start the conversation and create something
            extraordinary.
          </p>
          <button
            onClick={() => scrollToSection("#schedule")}
            className="group bg-gradient-to-r from-violet-500 to-cyan-400 text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 flex items-center gap-3 mx-auto"
            data-editable="cta-button"
          >
            Schedule a Free Call
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

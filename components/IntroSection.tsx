"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Target, Zap, Heart, TrendingUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    {
      icon: Target,
      number: "150+",
      label: "Projects Delivered",
      description: "Across diverse industries and markets",
    },
    {
      icon: Zap,
      number: "98%",
      label: "Client Satisfaction",
      description: "Measured through feedback and retention",
    },
    {
      icon: Heart,
      number: "80+",
      label: "Happy Clients",
      description: "Long-term partnerships built on trust",
    },
    {
      icon: TrendingUp,
      number: "300%",
      label: "Average ROI",
      description: "Return on investment for our clients",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section during scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".intro-content",
        pinSpacing: false,
      })

      // Animate stats cards
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      )

      // Text reveal animation
      gsap.fromTo(
        ".intro-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="animate-section min-h-screen bg-gradient-to-br from-gray-900/50 to-[#0F0F0F] light:from-gray-50 light:to-white relative overflow-hidden"
    >
      <div className="intro-content container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="intro-text text-5xl md:text-7xl font-bold mb-8 text-white light:text-gray-900">
              Where{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] to-[#3B82F6]">Vision</span>{" "}
              Meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#00FFB2]">
                Execution
              </span>
            </h2>
            <p className="intro-text text-xl md:text-2xl text-gray-300 light:text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At VampForge, we don't just create digital experiences—we craft stories that resonate, engage, and
              convert. Our mission is to bridge the gap between cutting-edge technology and compelling creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card group relative backdrop-blur-xl bg-white/5 light:bg-gray-900/5 border border-white/10 light:border-gray-900/10 rounded-3xl p-8 hover:border-[#00FFB2]/50 transition-all duration-700 hover:-translate-y-6 magnetic-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00FFB2]/5 to-[#3B82F6]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00FFB2] to-[#3B82F6] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="w-10 h-10 text-black" />
                  </div>
                  <div className="text-4xl font-bold text-[#00FFB2] mb-3">{stat.number}</div>
                  <div className="text-xl font-semibold text-white light:text-gray-900 mb-3">{stat.label}</div>
                  <div className="text-gray-400 light:text-gray-600 text-sm leading-relaxed">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

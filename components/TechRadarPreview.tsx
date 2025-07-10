"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Radar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function TechRadarPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const radarRef = useRef<HTMLDivElement>(null)

  const techItems = [
    { name: "React 19", x: 30, y: 25, quadrant: "adopt", category: "Frontend" },
    { name: "Bun", x: 70, y: 35, quadrant: "trial", category: "Runtime" },
    { name: "Astro", x: 45, y: 60, quadrant: "assess", category: "Framework" },
    { name: "Deno", x: 80, y: 75, quadrant: "hold", category: "Runtime" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".radar-item",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Rotate radar background
      gsap.to(".radar-bg", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="animate-section py-20 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Tech Radar
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Interactive visualization of technology adoption and trends
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div ref={radarRef} className="relative w-full h-96 mx-auto">
              {/* Radar Background */}
              <div className="radar-bg absolute inset-0 opacity-20">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <defs>
                    <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="cyan" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="purple" stopOpacity="0.05" />
                    </radialGradient>
                  </defs>
                  <circle cx="200" cy="200" r="180" fill="url(#radarGradient)" stroke="cyan" strokeWidth="1" />
                  <circle cx="200" cy="200" r="120" fill="none" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />
                  <circle cx="200" cy="200" r="60" fill="none" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="20" y1="200" x2="380" y2="200" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />
                  <line x1="200" y1="20" x2="200" y2="380" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />
                </svg>
              </div>

              {/* Tech Items */}
              {techItems.map((item, index) => (
                <div
                  key={index}
                  className="radar-item absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                >
                  <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900 border border-cyan-400/50 rounded-lg p-2 whitespace-nowrap">
                      <div className="text-white font-semibold">{item.name}</div>
                      <div className="text-cyan-400 text-sm">{item.category}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/radar"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
              >
                <Radar className="w-5 h-5" />
                Explore Full Radar
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

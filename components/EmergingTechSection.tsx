"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TrendingUp, Zap, Brain, Cpu } from "lucide-react"

export default function EmergingTechSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const emergingTech = [
    {
      icon: Brain,
      title: "AI Agents",
      description: "Autonomous AI systems that can perform complex tasks",
      trend: "+245%",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Edge Computing",
      description: "Processing data closer to where it's generated",
      trend: "+189%",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Cpu,
      title: "WebAssembly",
      description: "High-performance applications in web browsers",
      trend: "+156%",
      color: "from-green-500 to-teal-500",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
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
    <section ref={sectionRef} className="animate-section py-20 bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Emerging Tech
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Technologies that are reshaping the development landscape
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {emergingTech.map((tech, index) => (
            <div
              key={index}
              className="tech-card group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} p-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <tech.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-bold">{tech.trend}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                {tech.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

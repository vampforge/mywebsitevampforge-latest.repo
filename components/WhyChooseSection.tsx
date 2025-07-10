"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Award, Clock, Users, Zap } from "lucide-react"

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    {
      icon: Award,
      number: "100+",
      label: "Projects Delivered",
      description: "Successfully launched projects across industries",
    },
    {
      icon: Users,
      number: "50+",
      label: "Happy Clients",
      description: "Long-term partnerships built on trust and results",
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Support",
      description: "Always available when you need us most",
    },
    {
      icon: Zap,
      number: "3+",
      label: "Years Experience",
      description: "Proven expertise in digital innovation",
    },
  ]

  const features = [
    "Strategic thinking meets creative execution",
    "Modern tech stack with proven methodologies",
    "Transparent communication throughout the process",
    "Results-driven approach to every project",
    "Ongoing support and optimization",
    "Competitive pricing without compromising quality",
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      gsap.fromTo(
        ".counter",
        { textContent: 0 },
        {
          textContent: (i, target) => target.getAttribute("data-count"),
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      gsap.fromTo(
        ".feature-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".features-list",
            start: "top 80%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="animate-section py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">VampForge</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine creative excellence with technical expertise to deliver solutions that don't just look great—they
            perform exceptionally
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-black" />
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                <span className="counter" data-count={stat.number.replace("+", "")}>
                  0
                </span>
                {stat.number.includes("+") && "+"}
                {stat.number.includes("/") && stat.number.split("/")[1]}
              </div>
              <div className="text-xl font-semibold text-white mb-3">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-white">What Sets Us Apart</h3>
          <div className="features-list grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-item flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5">
                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

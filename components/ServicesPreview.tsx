"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Code, Palette, Search, ShoppingCart, Smartphone, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love to interact with",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Branding",
      description: "Complete brand identity design that tells your unique story",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      description: "High-converting online stores that drive sales and growth",
      gradient: "from-orange-400 to-red-500",
    },
    {
      icon: Search,
      title: "SEO & Marketing",
      description: "Strategic digital marketing that amplifies your reach",
      gradient: "from-teal-400 to-green-500",
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      description: "Data-driven strategies to scale your business effectively",
      gradient: "from-indigo-400 to-purple-500",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal scroll animation for desktop
      if (window.innerWidth >= 768) {
        const scrollContainer = scrollRef.current
        if (scrollContainer) {
          gsap.to(scrollContainer, {
            x: () => -(scrollContainer.scrollWidth - scrollContainer.clientWidth),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${scrollContainer.scrollWidth}`,
              scrub: 1,
              pin: true,
            },
          })
        }
      }

      // Service card animations
      gsap.fromTo(
        ".service-card",
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="animate-section py-20 bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Craft</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From concept to launch, we deliver comprehensive digital solutions that drive real business results
          </p>
        </div>
      </div>

      {/* Desktop Horizontal Scroll */}
      <div className="hidden md:block">
        <div ref={scrollRef} className="flex gap-8 px-4" style={{ width: "fit-content" }}>
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-500 hover:-translate-y-4 min-w-[350px]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
              ></div>
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                <div className="flex items-center text-green-400 font-semibold group-hover:text-green-300 transition-colors">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 text-center">
        <Link
          href="/services"
          className="magnetic-btn inline-block bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-400/25"
        >
          Explore All Services
        </Link>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Code, Palette, Search, ShoppingCart, Smartphone, TrendingUp, Megaphone, Layers } from "lucide-react"
import Link from "next/link"

export default function ServicesSnapshot() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and applications built with cutting-edge technologies",
      gradient: "from-[#00FFB2] to-emerald-400",
      delay: 0.1,
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that users love to interact with",
      gradient: "from-[#3B82F6] to-cyan-400",
      delay: 0.2,
    },
    {
      icon: Smartphone,
      title: "Branding",
      description: "Complete brand identity design that tells your unique story",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.3,
    },
    {
      icon: Search,
      title: "SEO & Marketing",
      description: "Strategic digital marketing that amplifies your reach and impact",
      gradient: "from-orange-500 to-red-500",
      delay: 0.4,
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce",
      description: "High-converting online stores that drive sales and growth",
      gradient: "from-teal-500 to-green-500",
      delay: 0.5,
    },
    {
      icon: TrendingUp,
      title: "Strategy",
      description: "Data-driven strategies to scale your business effectively",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.6,
    },
    {
      icon: Megaphone,
      title: "Digital Ads",
      description: "Performance marketing campaigns that deliver measurable results",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.7,
    },
    {
      icon: Layers,
      title: "Creative Direction",
      description: "Comprehensive creative leadership for your brand's visual identity",
      gradient: "from-rose-500 to-pink-500",
      delay: 0.8,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for service cards
      gsap.fromTo(
        ".service-card",
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationY: 45,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      // Hover animations for each card
      services.forEach((_, index) => {
        const card = `.service-card-${index}`

        gsap.set(card, { transformPerspective: 1000 })

        // Mouse enter
        gsap.set(card, {
          onMouseEnter: () => {
            gsap.to(card, {
              rotationY: 5,
              rotationX: 5,
              scale: 1.05,
              duration: 0.5,
              ease: "power2.out",
            })
          },
          onMouseLeave: () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="animate-section py-32 bg-[#0F0F0F] light:bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white light:text-gray-900">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFB2] to-[#3B82F6]">
              Expertise
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 light:text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From concept to launch, we deliver comprehensive digital solutions that drive real business results
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card service-card-${index} group relative backdrop-blur-xl bg-white/5 light:bg-gray-900/5 border border-white/10 light:border-gray-900/10 rounded-3xl p-8 hover:border-[#00FFB2]/50 transition-all duration-700 magnetic-hover cursor-pointer`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-700`}
              ></div>
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white light:text-gray-900 group-hover:text-[#00FFB2] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-400 light:text-gray-600 leading-relaxed text-sm">{service.description}</p>
                <div className="mt-6 flex items-center text-[#00FFB2] font-semibold group-hover:text-[#3B82F6] transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="magnetic-hover inline-block bg-gradient-to-r from-[#00FFB2] to-[#3B82F6] text-black px-10 py-5 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-[#00FFB2]/30"
          >
            Explore All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

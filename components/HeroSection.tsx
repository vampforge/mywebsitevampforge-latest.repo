"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react"

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      // Hero animations
      tl.fromTo(headlineRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.6",
        )
        .fromTo(
          buttonsRef.current?.children,
          { opacity: 0, y: 30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
          "-=0.4",
        )

      // Background particles animation
      gsap.to(".particle", {
        y: -100,
        opacity: 0,
        duration: 4,
        ease: "power1.out",
        repeat: -1,
        stagger: 0.5,
      })

      // Floating elements
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32"
      data-cms-section="hero"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-400/10"></div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-violet-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute top-16 sm:top-24 md:top-32 left-4 sm:left-10 floating-element opacity-20">
        <Sparkles className="text-violet-400 w-6 h-6 sm:w-8 sm:h-8" />
      </div>
      <div className="absolute top-24 sm:top-32 md:top-48 right-4 sm:right-20 floating-element opacity-20">
        <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-cyan-400/30 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 sm:bottom-40 left-4 sm:left-20 floating-element opacity-20">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full blur-sm"></div>
      </div>
      <div className="absolute top-1/2 right-4 sm:right-10 floating-element opacity-20">
        <Zap className="text-cyan-400 w-5 h-5 sm:w-7 sm:h-7" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto text-center">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight font-syne"
            data-editable="hero-headline"
          >
            <span className="block text-white mb-2 sm:mb-3 md:mb-4">Ignite Your Brand</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-400 to-lime-400">
              with VampForge
            </span>
          </h1>

          <p
            ref={subheadlineRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed px-2 sm:px-4"
            data-editable="hero-subheadline"
          >
            Powering visionaries, creators & future-forward brands with cutting-edge digital experiences that convert
            and captivate.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-2 sm:px-4"
          >
            <button
              onClick={() => scrollToSection("#contact")}
              className="group bg-gradient-to-r from-violet-500 to-cyan-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 flex items-center gap-3 transform hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25 w-full sm:w-auto justify-center max-w-xs sm:max-w-none"
              data-editable="primary-cta"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("#portfolio")}
              className="group border-2 border-violet-400/50 hover:border-violet-400 text-violet-400 hover:text-black hover:bg-violet-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 flex items-center gap-3 backdrop-blur-sm w-full sm:w-auto justify-center max-w-xs sm:max-w-none"
              data-editable="secondary-cta"
            >
              <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              Explore Our Work
            </button>
          </div>

          {/* Stats Section */}
          <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-2 sm:px-4">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-syne">500+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">Projects Delivered</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-syne">98%</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">Client Satisfaction</div>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 col-span-2 sm:col-span-1">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white font-syne">24/7</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-400 mt-1">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-violet-400/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-violet-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Award, Users, Target, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const stats = [
    { icon: Award, number: 150, label: "Projects Completed", suffix: "+" },
    { icon: Users, number: 80, label: "Happy Clients", suffix: "+" },
    { icon: Target, number: 98, label: "Success Rate", suffix: "%" },
    { icon: TrendingUp, number: 3, label: "Years Experience", suffix: "+" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      stats.forEach((stat, index) => {
        const counter = statsRef.current?.children[index]?.querySelector(".counter")
        if (counter) {
          gsap.fromTo(
            counter,
            { textContent: 0 },
            {
              textContent: stat.number,
              duration: 2,
              ease: "power2.out",
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
              },
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-900/50 light:bg-gray-50" data-cms-section="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-animate="fade-up">
            <h2
              className="text-5xl md:text-6xl font-bold mb-8 text-white light:text-gray-900 font-syne"
              data-editable="about-title"
            >
              Who We Are
            </h2>
            <p
              className="text-xl text-gray-300 light:text-gray-600 max-w-3xl mx-auto leading-relaxed"
              data-editable="about-description"
            >
              At VampForge, creativity meets data to forge extraordinary digital experiences. We're not just another
              agency—we're your strategic partners in digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div data-animate="slide-left">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Aman Jaiswal - Founder"
                  width={600}
                  height={500}
                  className="rounded-2xl"
                  data-editable="founder-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
            <div data-animate="slide-right">
              <h3
                className="text-3xl font-bold mb-6 text-white light:text-gray-900 font-syne"
                data-editable="founder-title"
              >
                Meet Aman Jaiswal
              </h3>
              <p className="text-lg text-gray-300 light:text-gray-600 mb-6 leading-relaxed" data-editable="founder-bio">
                Founder and Creative Director of VampForge, Aman brings a unique blend of creative vision and technical
                expertise to every project. With a passion for innovation and a keen eye for detail, he leads our team
                in crafting digital experiences that truly resonate.
              </p>
              <blockquote
                className="text-2xl font-light italic text-violet-400 border-l-4 border-violet-400 pl-6"
                data-editable="founder-quote"
              >
                "Creativity meets data at VampForge"
              </blockquote>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8" data-stagger>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 light:bg-gray-900/5 border border-white/10 light:border-gray-900/10 hover:border-violet-400/50 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-black" />
                </div>
                <div className="text-4xl font-bold text-violet-400 mb-2">
                  <span className="counter">0</span>
                  {stat.suffix}
                </div>
                <div className="text-gray-300 light:text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

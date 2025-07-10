"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ThemeProvider from "@/components/ThemeProvider"
import CursorEffect from "@/components/CursorEffect"
import { Target, Users, Award, TrendingUp, Heart, Lightbulb, Zap } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const pageRef = useRef<HTMLElement>(null)

  const milestones = [
    { icon: Target, number: "100+", label: "Successful Projects", description: "Delivered across various industries" },
    { icon: Users, number: "50+", label: "Happy Clients", description: "Long-term partnerships built on trust" },
    { icon: Award, number: "4.9/5", label: "Client Satisfaction", description: "Average rating from client feedback" },
    { icon: TrendingUp, number: "3+", label: "Years of Excellence", description: "Continuous growth and innovation" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion-Driven",
      description: "We pour our heart into every project, treating your success as our own",
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Always exploring new technologies and creative approaches to solve problems",
    },
    {
      icon: Zap,
      title: "Results Focused",
      description: "Every decision we make is guided by measurable outcomes and business impact",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".fade-in",
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".milestone-card",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".milestones-section",
            start: "top 70%",
          },
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <ThemeProvider>
      <main ref={pageRef} className="min-h-screen bg-gray-950 text-white">
        <CursorEffect />
        <Header />

        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="fade-in text-5xl md:text-7xl font-bold mb-8">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                VampForge
              </span>
            </h1>
            <p className="fade-in text-xl md:text-2xl max-w-4xl mx-auto text-gray-300 leading-relaxed">
              We're on a mission to bridge the gap between creativity and technology, helping ambitious brands create
              digital experiences that truly connect with their audience.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="fade-in text-4xl md:text-5xl font-bold mb-8 text-white">Our Mission</h2>
                  <div className="fade-in space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                      At VampForge, we believe that great design isn't just about looking good—it's about creating
                      meaningful connections between brands and their audiences. We combine bold creativity with
                      cutting-edge technology to deliver solutions that don't just meet expectations, they exceed them.
                    </p>
                    <p>
                      Every project we take on is an opportunity to push boundaries, challenge conventions, and create
                      something truly extraordinary. We're not just service providers; we're creative partners invested
                      in your success.
                    </p>
                  </div>
                </div>
                <div className="fade-in">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=500&width=600"
                      alt="VampForge Team"
                      width={600}
                      height={500}
                      className="rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Story */}
        <section className="py-20 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="fade-in order-2 lg:order-1">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=500&width=500"
                      alt="Aman Jaiswal - Founder"
                      width={500}
                      height={500}
                      className="rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent rounded-2xl"></div>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h2 className="fade-in text-4xl md:text-5xl font-bold mb-8 text-white">Meet the Founder</h2>
                  <div className="fade-in space-y-6 text-lg text-gray-300 leading-relaxed">
                    <p>
                      <span className="text-green-400 font-semibold">Aman Jaiswal</span> founded VampForge with a vision
                      to create a different kind of creative agency—one that truly understands both the artistic and
                      technical sides of digital innovation.
                    </p>
                    <p>
                      With a background in both design and development, Aman brings a unique perspective to every
                      project. His passion for emerging technologies and eye for design has helped VampForge become a
                      trusted partner for startups and established brands alike.
                    </p>
                    <p>
                      "I believe that the best digital experiences happen when creativity and technology work in perfect
                      harmony. That's what we strive for in every project we take on."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <h2 className="fade-in text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              What We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                Stand For
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="fade-in group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-500 hover:-translate-y-2 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="milestones-section py-20 bg-gray-950">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Journey</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="milestone-card group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-green-400/50 transition-all duration-500 hover:-translate-y-2 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <milestone.icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-4xl font-bold text-green-400 mb-2">{milestone.number}</div>
                  <div className="text-xl font-semibold text-white mb-3">{milestone.label}</div>
                  <div className="text-gray-400 text-sm">{milestone.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </ThemeProvider>
  )
}

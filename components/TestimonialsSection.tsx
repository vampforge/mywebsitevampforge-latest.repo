"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "VampForge transformed our digital presence completely. Their creative approach combined with technical excellence delivered results beyond our expectations.",
      author: "Priya Sharma",
      role: "CEO, TechStart Solutions",
      company: "TechStart",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "Working with Aman and the VampForge team was a game-changer. They understood our vision and brought it to life with incredible attention to detail.",
      author: "Rajesh Kumar",
      role: "Founder, Digital Innovations",
      company: "Digital Innovations",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The level of creativity and professionalism at VampForge is unmatched. They delivered a website that not only looks stunning but converts exceptionally well.",
      author: "Sarah Chen",
      role: "Marketing Director, GrowthCorp",
      company: "GrowthCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="animate-section py-20 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Stories</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it—hear what our clients have to say about their VampForge experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="testimonial-card relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="absolute top-8 left-8">
              <Quote className="w-12 h-12 text-green-400/30" />
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-2xl md:text-3xl text-white mb-8 leading-relaxed font-light">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center justify-center space-x-4">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].author}
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-full border-2 border-green-400/50"
                />
                <div className="text-left">
                  <div className="text-xl font-bold text-white">{testimonials[currentIndex].author}</div>
                  <div className="text-green-400 font-semibold">{testimonials[currentIndex].role}</div>
                  <div className="text-gray-400">{testimonials[currentIndex].company}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-800/50 hover:bg-green-400/20 text-gray-400 hover:text-green-400 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-green-400" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gray-800/50 hover:bg-green-400/20 text-gray-400 hover:text-green-400 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

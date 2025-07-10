"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function WeeklyStackSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const weeklyStack = [
    {
      week: "Week 47, 2024",
      title: "Full-Stack AI Development",
      description: "Building intelligent applications with Next.js, OpenAI, and Vercel",
      tools: ["Next.js 15", "OpenAI API", "Vercel AI SDK", "Tailwind CSS"],
      readTime: "12 min read",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stack-card",
        { opacity: 0, y: 30 },
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

  return (
    <section ref={sectionRef} className="animate-section py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Weekly Stack
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Deep dives into the latest tech stacks and development patterns
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {weeklyStack.map((stack, index) => (
            <div
              key={index}
              className="stack-card backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">{stack.week}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{stack.readTime}</span>
              </div>

              <h3 className="text-3xl font-bold mb-4 text-white hover:text-cyan-400 transition-colors">
                {stack.title}
              </h3>
              <p className="text-xl text-gray-400 mb-6 leading-relaxed">{stack.description}</p>

              <div className="flex flex-wrap gap-3 mb-8">
                {stack.tools.map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-400 px-4 py-2 rounded-full font-semibold"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <Link
                href="/articles"
                className="group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
              >
                Read Full Article
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

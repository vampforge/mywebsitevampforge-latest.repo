"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const projects = [
    {
      title: "NeoFit App",
      description: "Fitness tracking UI/UX design with analytics dashboard",
      image: "/placeholder.svg?height=300&width=400",
      category: "UI/UX Design",
    },
    {
      title: "UrbanStyle",
      description: "Fashion e-commerce website with custom Shopify integration",
      image: "/placeholder.svg?height=300&width=400",
      category: "E-Commerce",
    },
    {
      title: "CodeSage",
      description: "SaaS product launch with collaborative code platform",
      image: "/placeholder.svg?height=300&width=400",
      category: "SaaS Development",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
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
    <section ref={sectionRef} className="animate-section py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Latest Work by <span className="text-purple-600">VampForge</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-purple-600 font-semibold mb-2">{project.category}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Explore Our Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {
  const pageRef = useRef<HTMLElement>(null)
  const [activeFilter, setActiveFilter] = useState("All")

  const projects = [
    {
      title: "NeoFit App",
      description: "Fitness platform with analytics dashboard and user tracking",
      image: "/placeholder.svg?height=400&width=600",
      category: "UI/UX",
      tags: ["Mobile App", "Fitness", "Analytics"],
    },
    {
      title: "UrbanStyle",
      description: "Fashion e-commerce with custom Shopify integration",
      image: "/placeholder.svg?height=400&width=600",
      category: "E-Commerce",
      tags: ["Shopify", "Fashion", "E-commerce"],
    },
    {
      title: "CodeSage",
      description: "SaaS web app for code collaboration and project management",
      image: "/placeholder.svg?height=400&width=600",
      category: "SaaS",
      tags: ["SaaS", "Collaboration", "Development"],
    },
    {
      title: "TechStart Brand",
      description: "Complete branding package for technology startup",
      image: "/placeholder.svg?height=400&width=600",
      category: "Branding",
      tags: ["Logo Design", "Brand Identity", "Startup"],
    },
    {
      title: "RestaurantPro",
      description: "Restaurant management system with online ordering",
      image: "/placeholder.svg?height=400&width=600",
      category: "Web Design",
      tags: ["Restaurant", "Management", "Online Ordering"],
    },
    {
      title: "HealthCare Plus",
      description: "Medical practice website with appointment booking",
      image: "/placeholder.svg?height=400&width=600",
      category: "Web Design",
      tags: ["Healthcare", "Booking System", "Medical"],
    },
  ]

  const filters = ["All", "Web Design", "Branding", "UI/UX", "E-Commerce", "SaaS"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

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
        ".project-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 70%",
          },
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="fade-in text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p className="fade-in text-xl max-w-3xl mx-auto">
            Explore our featured projects and see how we've helped brands transform their digital presence.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="project-card group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="fade-in text-4xl font-bold mb-6 text-gray-900">Ready to Start Your Project?</h2>
          <p className="fade-in text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's turn your vision into reality. Reach out and let's discuss how we can help.
          </p>
          <div className="fade-in">
            <Link
              href="/contact"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </Link>
          </div>
          <div className="fade-in mt-6 text-gray-600">vampforgee@gmail.com</div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

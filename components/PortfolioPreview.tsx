"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ExternalLink, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects = [
    {
      title: "TechStart Solutions",
      category: "Web Development",
      description: "Modern SaaS platform with advanced analytics dashboard",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Digital Innovations",
      category: "Branding & Web Design",
      description: "Complete brand identity and responsive website design",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Branding", "UI/UX", "WordPress"],
      link: "#",
    },
    {
      title: "GrowthCorp",
      category: "E-Commerce",
      description: "High-converting e-commerce platform with custom features",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Shopify", "Custom Dev", "SEO"],
      link: "#",
    },
    {
      title: "Creative Studio",
      category: "Portfolio Website",
      description: "Stunning portfolio showcase for creative professionals",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "GSAP", "CMS"],
      link: "#",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".portfolio-card",
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
    <section ref={sectionRef} className="animate-section py-20 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Work</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of our recent projects that demonstrate our commitment to excellence and innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="portfolio-card group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-green-400/50 transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
                <div
                  className={`absolute inset-0 bg-green-400/20 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProject === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="flex space-x-4">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Eye className="w-6 h-6" />
                    </button>
                    <a
                      href={project.link}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="magnetic-btn inline-block bg-gradient-to-r from-green-400 to-blue-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-400/25"
          >
            View Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState, useRef } from "react"
import { ExternalLink, Eye } from "lucide-react"
import Image from "next/image"

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const sectionRef = useRef<HTMLElement>(null)

  const filters = ["All", "Branding", "Web", "Campaigns"]

  const projects = [
    {
      title: "TechStart Rebrand",
      type: "Branding",
      category: "Brand Identity",
      image: "/placeholder.svg?height=400&width=600",
      description: "Complete brand transformation for a tech startup",
    },
    {
      title: "E-commerce Platform",
      type: "Web",
      category: "Web Development",
      image: "/placeholder.svg?height=400&width=600",
      description: "Custom e-commerce solution with advanced features",
    },
    {
      title: "Social Campaign",
      type: "Campaigns",
      category: "Digital Marketing",
      image: "/placeholder.svg?height=400&width=600",
      description: "Viral social media campaign that reached 2M+ users",
    },
    {
      title: "Mobile App Design",
      type: "Web",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=400&width=600",
      description: "Intuitive mobile app interface design",
    },
    {
      title: "Brand Guidelines",
      type: "Branding",
      category: "Brand Strategy",
      image: "/placeholder.svg?height=400&width=600",
      description: "Comprehensive brand guidelines and style guide",
    },
    {
      title: "Product Launch",
      type: "Campaigns",
      category: "Marketing Campaign",
      image: "/placeholder.svg?height=400&width=600",
      description: "Multi-channel product launch campaign",
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.type === activeFilter)

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 bg-gray-900/50 light:bg-gray-50"
      data-cms-section="portfolio"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-animate="fade-up">
          <h2
            className="text-5xl md:text-6xl font-bold mb-8 text-white light:text-gray-900 font-syne"
            data-editable="portfolio-title"
          >
            Featured Work
          </h2>
          <p
            className="text-xl text-gray-300 light:text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-editable="portfolio-description"
          >
            Explore our latest projects and see how we've helped brands transform their digital presence
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12" data-animate="fade-up">
          <div className="flex flex-wrap gap-4 p-2 bg-white/5 light:bg-gray-900/5 rounded-full border border-white/10 light:border-gray-900/10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-violet-500 to-cyan-400 text-black"
                    : "text-gray-400 light:text-gray-600 hover:text-white light:hover:text-gray-900 hover:bg-white/10 light:hover:bg-gray-900/10"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-stagger>
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/5 light:bg-gray-900/5 border border-white/10 light:border-gray-900/10 rounded-3xl overflow-hidden hover:border-violet-400/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              data-editable={`project-${index}`}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <Eye className="w-6 h-6" />
                    </button>
                    <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-violet-500/20 text-violet-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white light:text-gray-900 group-hover:text-violet-400 transition-colors duration-300 font-syne">
                  {project.title}
                </h3>
                <p className="text-gray-400 light:text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

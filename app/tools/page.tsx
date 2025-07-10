"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Search, Filter, Star, ExternalLink, Github, Tag } from "lucide-react"
import Image from "next/image"

export default function ToolVault() {
  const pageRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const categories = ["All", "Frontend", "Backend", "AI/ML", "DevOps", "Design", "Database"]
  const types = ["All", "Framework", "Library", "API", "CLI", "SaaS", "Open Source"]

  const tools = [
    {
      name: "Next.js",
      description: "The React Framework for Production",
      category: "Frontend",
      type: "Framework",
      pricing: "Free",
      rating: 4.9,
      stars: "118k",
      image: "/placeholder.svg?height=80&width=80",
      website: "https://nextjs.org",
      github: "https://github.com/vercel/next.js",
      tags: ["React", "SSR", "Static Site"],
    },
    {
      name: "Supabase",
      description: "Open source Firebase alternative",
      category: "Backend",
      type: "SaaS",
      pricing: "Freemium",
      rating: 4.8,
      stars: "65k",
      image: "/placeholder.svg?height=80&width=80",
      website: "https://supabase.com",
      github: "https://github.com/supabase/supabase",
      tags: ["Database", "Auth", "API"],
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      category: "Frontend",
      type: "Framework",
      pricing: "Free",
      rating: 4.7,
      stars: "78k",
      image: "/placeholder.svg?height=80&width=80",
      website: "https://tailwindcss.com",
      github: "https://github.com/tailwindlabs/tailwindcss",
      tags: ["CSS", "Utility", "Design"],
    },
  ]

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
    const matchesType = selectedType === "All" || tool.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tool-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [filteredTools])

  return (
    <main ref={pageRef} className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Tool Vault
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Discover hand-picked development tools, APIs, libraries, and frameworks that power modern applications
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tools, frameworks, APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-gray-400 font-mono"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-800/30 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 font-mono">Filters:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-mono transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full font-mono transition-all duration-300 ${
                    selectedType === type
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <div
                key={index}
                className="tool-card group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={tool.image || "/placeholder.svg"}
                      alt={tool.name}
                      width={80}
                      height={80}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            tool.pricing === "Free"
                              ? "bg-green-500/20 text-green-400"
                              : tool.pricing === "Freemium"
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          {tool.pricing}
                        </span>
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">{tool.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-4 leading-relaxed">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="flex items-center gap-1 bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-gray-300 text-sm">{tool.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Github className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 text-sm">{tool.stars}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={tool.website}
                      className="p-2 bg-gray-800 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={tool.github}
                      className="p-2 bg-gray-800 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No tools found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

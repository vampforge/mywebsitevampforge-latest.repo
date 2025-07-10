"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Star, ExternalLink, Bookmark, Share2, Github } from "lucide-react"
import Image from "next/image"

export default function ForgePicksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const forgePicks = [
    {
      title: "Vercel AI SDK",
      description: "Build AI-powered applications with React, Svelte, Vue, and Solid",
      category: "AI/ML",
      tags: ["React", "AI", "SDK"],
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300",
      link: "https://sdk.vercel.ai",
      github: "https://github.com/vercel/ai",
      featured: true,
    },
    {
      title: "Shadcn/UI",
      description: "Beautifully designed components built with Radix UI and Tailwind CSS",
      category: "UI/UX",
      tags: ["React", "Components", "Design"],
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      link: "https://ui.shadcn.com",
      github: "https://github.com/shadcn/ui",
      featured: true,
    },
    {
      title: "Supabase",
      description: "Open source Firebase alternative with PostgreSQL database",
      category: "Backend",
      tags: ["Database", "Auth", "API"],
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300",
      link: "https://supabase.com",
      github: "https://github.com/supabase/supabase",
      featured: false,
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".forge-card",
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
    <section ref={sectionRef} className="animate-section py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Forge Picks
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Hand-curated tools and resources that are shaping the future of development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {forgePicks.map((pick, index) => (
            <div
              key={index}
              className={`forge-card group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 ${
                pick.featured ? "ring-2 ring-cyan-400/30" : ""
              }`}
            >
              {pick.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>
              )}

              <div className="relative overflow-hidden">
                <Image
                  src={pick.image || "/placeholder.svg"}
                  alt={pick.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {pick.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-300 text-sm">{pick.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {pick.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{pick.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pick.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href={pick.link}
                      className="p-2 bg-gray-800 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={pick.github}
                      className="p-2 bg-gray-800 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

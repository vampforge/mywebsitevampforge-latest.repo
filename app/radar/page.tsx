"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Filter, Info } from "lucide-react"

export default function TechRadar() {
  const pageRef = useRef<HTMLElement>(null)
  const radarRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTech, setSelectedTech] = useState<any>(null)

  const categories = ["All", "Frontend", "Backend", "AI/ML", "Cloud", "Mobile", "DevOps"]

  const techItems = [
    {
      name: "React 19",
      category: "Frontend",
      quadrant: "adopt",
      x: 25,
      y: 25,
      description: "Latest version of React with concurrent features and improved performance",
      stage: "Stable release with new features like Server Components",
      tags: ["Frontend", "Library", "JavaScript"],
    },
    {
      name: "Bun",
      category: "Backend",
      quadrant: "trial",
      x: 75,
      y: 30,
      description: "Fast all-in-one JavaScript runtime and toolkit",
      stage: "Production ready but still evolving rapidly",
      tags: ["Runtime", "JavaScript", "Performance"],
    },
    {
      name: "Astro",
      category: "Frontend",
      quadrant: "assess",
      x: 30,
      y: 70,
      description: "Modern static site generator with component islands",
      stage: "Gaining traction, worth evaluating for static sites",
      tags: ["Static Site", "Framework", "Performance"],
    },
    {
      name: "Deno",
      category: "Backend",
      quadrant: "hold",
      x: 80,
      y: 80,
      description: "Secure runtime for JavaScript and TypeScript",
      stage: "Stable but ecosystem still developing",
      tags: ["Runtime", "TypeScript", "Security"],
    },
    {
      name: "GPT-4",
      category: "AI/ML",
      quadrant: "adopt",
      x: 20,
      y: 35,
      description: "Advanced language model for various AI applications",
      stage: "Widely adopted for production AI applications",
      tags: ["AI", "Language Model", "API"],
    },
    {
      name: "Vercel AI SDK",
      category: "AI/ML",
      quadrant: "trial",
      x: 70,
      y: 25,
      description: "TypeScript toolkit for building AI applications",
      stage: "Promising toolkit for AI integration",
      tags: ["AI", "SDK", "TypeScript"],
    },
  ]

  const filteredTech =
    selectedCategory === "All" ? techItems : techItems.filter((item) => item.category === selectedCategory)

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "adopt":
        return "from-green-500 to-emerald-500"
      case "trial":
        return "from-blue-500 to-cyan-500"
      case "assess":
        return "from-yellow-500 to-orange-500"
      case "hold":
        return "from-red-500 to-pink-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".radar-item",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
      )

      // Rotate radar background
      gsap.to(".radar-bg", {
        rotation: 360,
        duration: 30,
        ease: "none",
        repeat: -1,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [filteredTech])

  return (
    <main ref={pageRef} className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Tech Radar
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive visualization of technology adoption and trends across four key quadrants
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-800/30 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 font-mono">Category:</span>
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
          </div>
        </div>
      </section>

      {/* Radar Visualization */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Radar Chart */}
            <div className="lg:col-span-2">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                <div ref={radarRef} className="relative w-full h-96 lg:h-[500px]">
                  {/* Radar Background */}
                  <div className="radar-bg absolute inset-0 opacity-30">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      <defs>
                        <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="cyan" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="purple" stopOpacity="0.05" />
                        </radialGradient>
                      </defs>
                      {/* Quadrant backgrounds */}
                      <path d="M 200 200 L 200 20 A 180 180 0 0 1 380 200 Z" fill="rgba(34, 197, 94, 0.1)" />
                      <path d="M 200 200 L 380 200 A 180 180 0 0 1 200 380 Z" fill="rgba(59, 130, 246, 0.1)" />
                      <path d="M 200 200 L 200 380 A 180 180 0 0 1 20 200 Z" fill="rgba(245, 158, 11, 0.1)" />
                      <path d="M 200 200 L 20 200 A 180 180 0 0 1 200 20 Z" fill="rgba(239, 68, 68, 0.1)" />

                      {/* Circles */}
                      <circle cx="200" cy="200" r="180" fill="none" stroke="cyan" strokeWidth="2" strokeOpacity="0.3" />
                      <circle cx="200" cy="200" r="120" fill="none" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />
                      <circle cx="200" cy="200" r="60" fill="none" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />

                      {/* Lines */}
                      <line x1="20" y1="200" x2="380" y2="200" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />
                      <line x1="200" y1="20" x2="200" y2="380" stroke="cyan" strokeWidth="1" strokeOpacity="0.3" />
                    </svg>
                  </div>

                  {/* Quadrant Labels */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-green-400 font-bold font-mono">
                    ADOPT
                  </div>
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-400 font-bold font-mono">
                    TRIAL
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold font-mono">
                    ASSESS
                  </div>
                  <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-red-400 font-bold font-mono">
                    HOLD
                  </div>

                  {/* Tech Items */}
                  {filteredTech.map((item, index) => (
                    <div
                      key={index}
                      className="radar-item absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                      onClick={() => setSelectedTech(item)}
                    >
                      <div
                        className={`w-6 h-6 bg-gradient-to-r ${getQuadrantColor(item.quadrant)} rounded-full group-hover:scale-150 transition-transform duration-300 shadow-lg`}
                      >
                        <div className="w-full h-full rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        <div className="bg-gray-900 border border-cyan-400/50 rounded-lg p-3 whitespace-nowrap shadow-xl">
                          <div className="text-white font-semibold font-mono">{item.name}</div>
                          <div className="text-cyan-400 text-sm">{item.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Details Panel */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                {selectedTech ? (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-4 h-4 bg-gradient-to-r ${getQuadrantColor(selectedTech.quadrant)} rounded-full`}
                      ></div>
                      <h3 className="text-2xl font-bold text-white font-mono">{selectedTech.name}</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-cyan-400 font-semibold mb-2 font-mono">Category</h4>
                        <p className="text-gray-300">{selectedTech.category}</p>
                      </div>

                      <div>
                        <h4 className="text-cyan-400 font-semibold mb-2 font-mono">Description</h4>
                        <p className="text-gray-300 leading-relaxed">{selectedTech.description}</p>
                      </div>

                      <div>
                        <h4 className="text-cyan-400 font-semibold mb-2 font-mono">Current Stage</h4>
                        <p className="text-gray-300 leading-relaxed">{selectedTech.stage}</p>
                      </div>

                      <div>
                        <h4 className="text-cyan-400 font-semibold mb-2 font-mono">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTech.tags.map((tag: string, index: number) => (
                            <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm font-mono">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div
                        className={`p-4 rounded-lg bg-gradient-to-r ${getQuadrantColor(selectedTech.quadrant)}/10 border border-current/20`}
                      >
                        <h4 className="font-semibold mb-2 font-mono text-white">
                          {selectedTech.quadrant.toUpperCase()} Recommendation
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selectedTech.quadrant === "adopt" &&
                            "Ready for production use. Proven technology with strong ecosystem support."}
                          {selectedTech.quadrant === "trial" &&
                            "Worth pursuing. Promising technology that shows potential for adoption."}
                          {selectedTech.quadrant === "assess" &&
                            "Worth exploring. Interesting technology that may have future potential."}
                          {selectedTech.quadrant === "hold" &&
                            "Proceed with caution. Technology may have limitations or better alternatives exist."}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Info className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400 mb-2 font-mono">Select a Technology</h3>
                    <p className="text-gray-500 font-mono">
                      Click on any point in the radar to view detailed information
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-3"></div>
              <h4 className="text-green-400 font-bold mb-2 font-mono">ADOPT</h4>
              <p className="text-gray-400 text-sm font-mono">Proven and stable. Use with confidence.</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-3"></div>
              <h4 className="text-blue-400 font-bold mb-2 font-mono">TRIAL</h4>
              <p className="text-gray-400 text-sm font-mono">Worth pursuing. Try in low-risk projects.</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto mb-3"></div>
              <h4 className="text-yellow-400 font-bold mb-2 font-mono">ASSESS</h4>
              <p className="text-gray-400 text-sm font-mono">Explore and understand the impact.</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-3"></div>
              <h4 className="text-red-400 font-bold mb-2 font-mono">HOLD</h4>
              <p className="text-gray-400 text-sm font-mono">Proceed with caution. Consider alternatives.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Search, Command, ArrowRight } from "lucide-react"

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")

  const quickActions = [
    { title: "Search Tools", description: "Find development tools and resources", action: "/tools" },
    { title: "Browse Articles", description: "Read tutorials and guides", action: "/articles" },
    { title: "View Tech Radar", description: "Explore technology trends", action: "/radar" },
    { title: "Join Community", description: "Connect with developers", action: "/community" },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-50"
      >
        <Search className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32">
      <div className="w-full max-w-2xl mx-4">
        <div className="backdrop-blur-xl bg-gray-900/90 border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center p-4 border-b border-gray-800">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search tools, articles, or type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none font-mono"
              autoFocus
            />
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Command className="w-4 h-4" />
              <span>K</span>
            </div>
          </div>

          <div className="p-4">
            <div className="text-gray-400 text-sm mb-3 font-mono">Quick Actions</div>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors group"
                  onClick={() => {
                    setIsOpen(false)
                    // Navigate to action
                  }}
                >
                  <div className="text-left">
                    <div className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                      {action.title}
                    </div>
                    <div className="text-gray-400 text-sm">{action.description}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

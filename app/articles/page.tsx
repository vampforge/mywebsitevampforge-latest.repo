"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Search, Filter, Clock, User, Tag, BookOpen } from "lucide-react"
import Link from "next/link"

export default function Articles() {
  const pageRef = useRef<HTMLElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const categories = ["All", "Web3", "AI/ML", "DevOps", "Frontend", "Backend", "Mobile"]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

  const articles = [
    {
      title: "Building AI-Powered Applications with Next.js and OpenAI",
      excerpt:
        "Learn how to integrate OpenAI's GPT models into your Next.js applications for intelligent user experiences.",
      category: "AI/ML",
      difficulty: "Intermediate",
      readTime: "12 min",
      author: "Alex Chen",
      date: "2024-11-15",
      tags: ["Next.js", "OpenAI", "AI", "React"],
      featured: true,
    },
    {
      title: "Mastering Docker for Modern Development Workflows",
      excerpt: "Complete guide to containerization with Docker, from basics to advanced orchestration techniques.",
      category: "DevOps",
      difficulty: "Beginner",
      readTime: "18 min",
      author: "Sarah Kim",
      date: "2024-11-12",
      tags: ["Docker", "Containers", "DevOps"],
      featured: false,
    },
    {
      title: "Web3 Development with Ethereum and Solidity",
      excerpt: "Build decentralized applications on Ethereum blockchain using Solidity smart contracts.",
      category: "Web3",
      difficulty: "Advanced",
      readTime: "25 min",
      author: "Mike Rodriguez",
      date: "2024-11-10",
      tags: ["Ethereum", "Solidity", "Web3", "Blockchain"],
      featured: true,
    },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "All" || article.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-400 bg-green-500/20"
      case "Intermediate":
        return "text-yellow-400 bg-yellow-500/20"
      case "Advanced":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".article-card",
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
  }, [filteredArticles])

  return (
    <main ref={pageRef} className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-mono">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Articles & Tutorials
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            In-depth guides, tutorials, and insights from the cutting edge of technology
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles and tutorials..."
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
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full font-mono transition-all duration-300 ${
                    selectedDifficulty === difficulty
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article, index) => (
              <article
                key={index}
                className={`article-card group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 ${
                  article.featured ? "ring-2 ring-cyan-400/30" : ""
                }`}
              >
                {article.featured && (
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold font-mono">
                    Featured Article
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold font-mono">
                      {article.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold font-mono ${getDifficultyColor(article.difficulty)}`}
                    >
                      {article.difficulty}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors leading-tight">
                    <Link href={`/articles/${index + 1}`}>{article.title}</Link>
                  </h2>

                  <p className="text-gray-400 mb-6 leading-relaxed">{article.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="flex items-center gap-1 bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm font-mono"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span className="font-mono">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{article.readTime}</span>
                      </div>
                    </div>
                    <span className="font-mono">{article.date}</span>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/articles/${index + 1}`}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors font-mono"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Article
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2 font-mono">No articles found</h3>
              <p className="text-gray-500 font-mono">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

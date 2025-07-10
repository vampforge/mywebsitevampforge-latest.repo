"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { gsap } from "gsap"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 w-12 h-12 bg-white/10 light:bg-gray-900/10 backdrop-blur-xl border border-white/20 light:border-gray-900/20 text-white light:text-gray-900 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:bg-violet-500/20 hover:border-violet-400/50 z-40 flex items-center justify-center"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Logo animation
      tl.fromTo(
        ".loader-logo",
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
      )
        .fromTo(".loader-text", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(".loader-progress", { width: "100%", duration: 1.5, ease: "power2.inOut" }, "-=0.3")
        .to(
          loaderRef.current,
          {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => setIsLoading(false),
          },
          "+=0.5",
        )
    }, loaderRef)

    return () => ctx.revert()
  }, [])

  if (!isLoading) return null

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-center">
        <div className="loader-logo w-20 h-20 bg-gradient-to-br from-[#00FFB2] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-8 mx-auto">
          <span className="text-black font-bold text-2xl">V</span>
        </div>
        <div className="loader-text mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">VampForge</h1>
          <p className="text-[#00FFB2] text-lg">Creative Tech That Connects</p>
        </div>
        <div className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div className="loader-progress h-full bg-gradient-to-r from-[#00FFB2] to-[#3B82F6] w-0 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

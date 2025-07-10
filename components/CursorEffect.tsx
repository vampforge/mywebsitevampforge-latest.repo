"use client"

import { useEffect, useRef } from "react"

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current

    if (!cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animateCursor = () => {
      const speed = 0.15
      cursorX += (mouseX - cursorX) * speed
      cursorY += (mouseY - cursorY) * speed

      cursor.style.left = cursorX + "px"
      cursor.style.top = cursorY + "px"
      cursorDot.style.left = mouseX + "px"
      cursorDot.style.top = mouseY + "px"

      requestAnimationFrame(animateCursor)
    }

    const handleMouseEnter = () => {
      cursor.style.transform = "scale(2)"
      cursor.style.backgroundColor = "rgba(0, 255, 178, 0.2)"
      cursor.style.borderColor = "rgba(0, 255, 178, 0.8)"
    }

    const handleMouseLeave = () => {
      cursor.style.transform = "scale(1)"
      cursor.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
      cursor.style.borderColor = "rgba(0, 255, 178, 0.5)"
    }

    document.addEventListener("mousemove", moveCursor)
    animateCursor()

    // Add magnetic effect to interactive elements
    const magneticElements = document.querySelectorAll(".magnetic-hover")
    magneticElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)

      el.addEventListener("mousemove", (e: any) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
      })

      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0px, 0px)"
      })
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      magneticElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-10 h-10 pointer-events-none z-50 rounded-full border border-[#00FFB2]/50 transition-all duration-300 ease-out hidden lg:block mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 pointer-events-none z-50 bg-[#00FFB2] rounded-full hidden lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}

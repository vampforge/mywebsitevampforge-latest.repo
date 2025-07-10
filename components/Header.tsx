"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, Sun, Moon, Phone } from "lucide-react"
import { gsap } from "gsap"
import { useTheme } from "./ThemeProvider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, { duration: 1, scrollTo: sectionId, ease: "power2.inOut" })
    setIsMenuOpen(false)
  }

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 light:bg-white/80 backdrop-blur-xl border-b border-violet-500/20 shadow-lg"
          : "bg-transparent"
      }`}
      data-cms-section="header"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center space-x-3 group"
            data-editable="logo"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-black font-bold text-xl font-syne">V</span>
              </div>
              <div className="absolute inset-0 bg-violet-500/20 rounded-lg blur-lg group-hover:bg-violet-500/40 transition-colors duration-300"></div>
            </div>
            <span className="text-2xl font-bold font-syne bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              VampForge
            </span>
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 light:text-gray-700 hover:text-violet-400 transition-colors duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 light:text-gray-600 hover:text-violet-400 transition-colors duration-300 rounded-lg hover:bg-gray-800/20 light:hover:bg-gray-200/50"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => scrollToSection("#schedule")}
              className="bg-gradient-to-r from-violet-500 to-cyan-400 text-black px-6 py-3 rounded-full hover:from-violet-400 hover:to-cyan-300 transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg hover:shadow-violet-500/25 flex items-center gap-2"
              data-editable="cta-button"
            >
              <Phone className="w-4 h-4" />
              Schedule a Call
            </button>
          </div>

          <button className="lg:hidden text-gray-400 light:text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 light:border-gray-200 backdrop-blur-xl bg-black/95 light:bg-white/95 rounded-lg">
            <nav className="flex flex-col space-y-4 mt-4 px-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 light:text-gray-700 hover:text-violet-400 transition-colors duration-300 text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800 light:border-gray-200">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-400 light:text-gray-600 hover:text-violet-400 transition-colors duration-300"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => scrollToSection("#schedule")}
                  className="bg-gradient-to-r from-violet-500 to-cyan-400 text-black px-6 py-3 rounded-full hover:from-violet-400 hover:to-cyan-300 transition-all duration-300 font-semibold flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Schedule a Call
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

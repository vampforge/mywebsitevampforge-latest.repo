"use client"

import { ArrowUp, Linkedin, Instagram, MessageSquare } from "lucide-react"
import { gsap } from "gsap"

export default function Footer() {
  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" })
  }

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, { duration: 1, scrollTo: sectionId, ease: "power2.inOut" })
  }

  const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
  ]

  const socialLinks = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: MessageSquare, href: "https://wa.me/917464003631", label: "WhatsApp" },
  ]

  return (
    <footer
      className="bg-gray-900 light:bg-gray-100 border-t border-gray-800 light:border-gray-200"
      data-cms-section="footer"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6" data-editable="footer-logo">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-xl font-syne">V</span>
                </div>
                <div className="absolute inset-0 bg-violet-500/20 rounded-lg blur-lg"></div>
              </div>
              <span className="text-2xl font-bold font-syne bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                VampForge
              </span>
            </div>
            <p
              className="text-gray-400 light:text-gray-600 mb-6 max-w-md leading-relaxed"
              data-editable="footer-description"
            >
              Igniting brands with creative excellence and cutting-edge technology. We craft digital experiences that
              captivate and convert.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 light:bg-gray-900/10 border border-white/20 light:border-gray-900/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-violet-400 hover:border-violet-400/50 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white light:text-gray-900 font-syne">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 light:text-gray-600 hover:text-violet-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-violet-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white light:text-gray-900 font-syne">Contact</h3>
            <div className="space-y-3">
              <p className="text-gray-400 light:text-gray-600">
                <span className="text-violet-400 font-semibold">Email:</span>
                <br />
                <a href="mailto:vampforgee@gmail.com" className="hover:text-violet-400 transition-colors">
                  vampforgee@gmail.com
                </a>
              </p>
              <p className="text-gray-400 light:text-gray-600">
                <span className="text-violet-400 font-semibold">Phone:</span>
                <br />
                <a href="tel:+917464003631" className="hover:text-violet-400 transition-colors">
                  +91 7464003631
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 light:border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 light:text-gray-600 text-sm" data-editable="copyright">
            © 2025 VampForge. Built with ♡ by Aman Jaiswal.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 bg-gradient-to-r from-violet-500 to-cyan-400 text-black p-3 rounded-full hover:from-violet-400 hover:to-cyan-300 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-violet-500/25"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger, ScrollToPlugin } from "gsap/all"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import PortfolioSection from "@/components/PortfolioSection"
import CTABanner from "@/components/CTABanner"
import ScheduleCallForm from "@/components/ScheduleCallForm"
import NewsletterCTA from "@/components/NewsletterCTA"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"
import ThemeProvider from "@/components/ThemeProvider"
import WhatsAppButton from "@/components/WhatsAppButton"
import BackToTop from "@/components/BackToTop"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Home() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initialize GSAP animations for all sections
      gsap.utils.toArray("[data-animate]").forEach((element: any) => {
        const animationType = element.getAttribute("data-animate")

        switch (animationType) {
          case "fade-up":
            gsap.fromTo(
              element,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            )
            break
          case "fade-in":
            gsap.fromTo(
              element,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            )
            break
          case "zoom-in":
            gsap.fromTo(
              element,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            )
            break
          case "slide-left":
            gsap.fromTo(
              element,
              { opacity: 0, x: -50 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            )
            break
          case "slide-right":
            gsap.fromTo(
              element,
              { opacity: 0, x: 50 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            )
            break
        }
      })

      // Staggered animations
      gsap.utils.toArray("[data-stagger]").forEach((container: any) => {
        const children = container.children
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      // Parallax effects
      gsap.utils.toArray("[data-parallax]").forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <ThemeProvider>
      <main ref={mainRef} className="min-h-screen bg-black dark:bg-black light:bg-white text-white light:text-gray-900">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <CTABanner />
        <ScheduleCallForm />
        <NewsletterCTA />
        <ContactSection />
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </main>
    </ThemeProvider>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Code, Palette, Smartphone, Search, ShoppingCart, CheckCircle } from "lucide-react"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const pageRef = useRef<HTMLElement>(null)

  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom-coded websites, CMS platforms, and web applications built for performance and scalability.",
      features: ["Custom Development", "CMS Integration", "Performance Optimization", "Responsive Design"],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Wireframes, prototypes, and intuitive digital interfaces focused on user experience.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    },
    {
      icon: Smartphone,
      title: "Branding & Identity",
      description: "Logo design, visual systems, brand strategy, and messaging that captures attention.",
      features: ["Logo Design", "Brand Strategy", "Visual Identity", "Brand Guidelines"],
    },
    {
      icon: Search,
      title: "SEO & Digital Marketing",
      description: "Keyword strategies, content marketing, on-page SEO, and campaign tracking.",
      features: ["SEO Optimization", "Content Strategy", "Analytics", "Campaign Management"],
    },
    {
      icon: ShoppingCart,
      title: "E-Commerce Solutions",
      description: "Shopify, WooCommerce, and custom e-commerce setups with full payment integration.",
      features: ["Platform Setup", "Payment Integration", "Inventory Management", "Custom Features"],
    },
  ]

  const processSteps = [
    { title: "Discovery & Strategy", description: "Understanding your goals and target audience" },
    { title: "Design & Feedback", description: "Creating designs and iterating based on your input" },
    { title: "Development & Testing", description: "Building and thoroughly testing your solution" },
    { title: "Launch & Optimize", description: "Going live and optimizing for best performance" },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fade-in",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".fade-in",
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".service-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 70%",
          },
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={pageRef}>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="fade-in text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="fade-in text-xl max-w-3xl mx-auto">
            We provide full-cycle digital services—from idea to execution. Whether you're a startup or a growing
            business, we tailor every solution to fit your goals.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="fade-in text-4xl font-bold mb-16 text-center text-gray-900">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="fade-in text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="fade-in text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="fade-in text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help bring your vision to life.
          </p>
          <div className="fade-in">
            <Link
              href="/contact"
              className="inline-block bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Request a Quote
            </Link>
          </div>
          <div className="fade-in mt-6 text-purple-200">📧 vampforgee@gmail.com | 📞 7464003631</div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

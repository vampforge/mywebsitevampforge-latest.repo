"use client"

import { useRef } from "react"
import { Palette, Share2, Megaphone, Code, Users, Lightbulb } from "lucide-react"

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const services = [
    {
      icon: Palette,
      title: "Branding & Identity",
      description: "Complete brand identity design that tells your unique story and resonates with your audience.",
      gradient: "from-violet-500 to-purple-600",
    },
    {
      icon: Share2,
      title: "Social Media Management",
      description: "Strategic social media campaigns that build communities and drive meaningful engagement.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: Megaphone,
      title: "Paid Media & Ads",
      description: "Performance-driven advertising campaigns that maximize ROI and accelerate growth.",
      gradient: "from-lime-400 to-green-500",
    },
    {
      icon: Code,
      title: "Web Design & Development",
      description: "Custom websites and applications built with cutting-edge technologies and stunning design.",
      gradient: "from-orange-400 to-red-500",
    },
    {
      icon: Users,
      title: "Influencer Marketing",
      description: "Authentic influencer partnerships that amplify your brand message and reach new audiences.",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      icon: Lightbulb,
      title: "Creative Strategy & Campaigns",
      description: "Data-driven creative strategies that capture attention and drive measurable results.",
      gradient: "from-indigo-400 to-purple-500",
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-black light:bg-white" data-cms-section="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-animate="fade-up">
          <h2
            className="text-5xl md:text-6xl font-bold mb-8 text-white light:text-gray-900 font-syne"
            data-editable="services-title"
          >
            What We Do
          </h2>
          <p
            className="text-xl text-gray-300 light:text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-editable="services-description"
          >
            From concept to execution, we deliver comprehensive digital solutions that drive real business results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-stagger>
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-white/5 light:bg-gray-900/5 border border-white/10 light:border-gray-900/10 hover:border-violet-400/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              data-editable={`service-${index}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
              ></div>
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white light:text-gray-900 group-hover:text-violet-400 transition-colors duration-300 font-syne">
                  {service.title}
                </h3>
                <p className="text-gray-400 light:text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-6 flex items-center text-violet-400 font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

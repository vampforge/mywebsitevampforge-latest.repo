"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { gsap } from "gsap"

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! 👋 I'm VampBot, your creative tech assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const chatRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our services or schedule a call.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      )
    }
  }, [isOpen])

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-[#00FFB2] to-[#3B82F6] hover:from-[#00FFB2]/80 hover:to-[#3B82F6]/80 text-black rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110 z-40 flex items-center justify-center magnetic-hover group"
      >
        {isOpen ? (
          <X className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        )}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 w-96 h-[500px] bg-[#0F0F0F]/95 light:bg-white/95 backdrop-blur-xl border border-[#00FFB2]/30 rounded-3xl shadow-2xl z-40 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-800 light:border-gray-200 bg-gradient-to-r from-[#00FFB2]/10 to-[#3B82F6]/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#00FFB2] to-[#3B82F6] rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-white light:text-gray-900 font-bold">VampBot</h3>
                <p className="text-[#00FFB2] text-sm">Creative Tech Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-[#00FFB2] to-[#3B82F6] text-black"
                      : "bg-gray-800/50 light:bg-gray-200/50 text-white light:text-gray-900"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 light:border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800/50 light:bg-gray-200/50 border border-gray-700 light:border-gray-300 rounded-full px-4 py-3 text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00FFB2] focus:border-transparent text-sm"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#00FFB2] to-[#3B82F6] text-black p-3 rounded-full hover:from-[#00FFB2]/80 hover:to-[#3B82F6]/80 transition-colors duration-300 magnetic-hover"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

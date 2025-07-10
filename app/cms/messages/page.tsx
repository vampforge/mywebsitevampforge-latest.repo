"use client"

import { useState } from "react"
import CMSSidebar from "@/components/cms/CMSSidebar"
import { MessageSquare, Mail, Phone, Calendar, Search, Filter, Eye, Trash2 } from "lucide-react"

export default function CMSMessages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [messages] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      subject: "Website Development Inquiry",
      message: "Hi, I'm interested in developing a new website for my business. Can we schedule a call?",
      date: "2024-01-15",
      status: "unread",
      type: "contact",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@company.com",
      phone: "+1 234 567 8901",
      subject: "Portfolio Review",
      message: "I saw your portfolio and I'm impressed. Would like to discuss a potential collaboration.",
      date: "2024-01-14",
      status: "read",
      type: "contact",
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike@startup.io",
      phone: "",
      subject: "Schedule Call Request",
      message: "Looking for a creative agency to help with our startup's branding and web presence.",
      date: "2024-01-13",
      status: "replied",
      type: "schedule",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@design.co",
      phone: "+1 234 567 8902",
      subject: "Partnership Opportunity",
      message: "We're a design agency looking for development partners. Interested in collaborating?",
      date: "2024-01-12",
      status: "unread",
      type: "contact",
    },
  ])

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || message.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-500/20 text-red-400"
      case "read":
        return "bg-blue-500/20 text-blue-400"
      case "replied":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "contact":
        return <Mail className="w-4 h-4" />
      case "schedule":
        return <Calendar className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CMSSidebar />

      <div className="lg:ml-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white font-syne mb-2">Messages</h1>
          <p className="text-gray-400">Manage contact form submissions and inquiries</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-input w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="cms-input pl-10 pr-8 py-3 rounded-xl text-white focus:outline-none appearance-none"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div key={message.id} className="cms-card rounded-2xl p-6 hover:border-violet-400/30 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">{message.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{message.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {message.email}
                      </span>
                      {message.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {message.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(message.status)}`}>
                    {message.status}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">{getTypeIcon(message.type)}</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">{message.subject}</h4>
                <p className="text-gray-300 leading-relaxed">{message.message}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {message.date}
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 rounded-lg transition-colors flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMessages.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No messages found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

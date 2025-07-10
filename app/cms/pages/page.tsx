"use client"

import { useState } from "react"
import CMSSidebar from "@/components/cms/CMSSidebar"
import { FileText, Edit, Eye, Trash2, Plus, Search } from "lucide-react"

export default function CMSPages() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pages] = useState([
    { id: 1, title: "Home Page", slug: "/", status: "published", lastModified: "2024-01-15", views: 1250 },
    { id: 2, title: "About Us", slug: "/about", status: "published", lastModified: "2024-01-14", views: 890 },
    { id: 3, title: "Services", slug: "/services", status: "published", lastModified: "2024-01-13", views: 756 },
    { id: 4, title: "Portfolio", slug: "/portfolio", status: "published", lastModified: "2024-01-12", views: 634 },
    { id: 5, title: "Contact", slug: "/contact", status: "published", lastModified: "2024-01-11", views: 423 },
    { id: 6, title: "Tools", slug: "/tools", status: "draft", lastModified: "2024-01-10", views: 0 },
    { id: 7, title: "Tech Radar", slug: "/radar", status: "published", lastModified: "2024-01-09", views: 312 },
    { id: 8, title: "Articles", slug: "/articles", status: "published", lastModified: "2024-01-08", views: 567 },
  ])

  const filteredPages = pages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 text-green-400"
      case "draft":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <CMSSidebar />

      <div className="lg:ml-64 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-syne mb-2">Pages</h1>
            <p className="text-gray-400">Manage your website pages and content</p>
          </div>
          <button className="cms-button px-6 py-3 rounded-xl text-black font-semibold flex items-center gap-2 mt-4 sm:mt-0">
            <Plus className="w-5 h-5" />
            Add New Page
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cms-input w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Pages Table */}
        <div className="cms-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-semibold">Page</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Views</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Last Modified</th>
                  <th className="text-left p-4 text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => (
                  <tr key={page.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{page.title}</h3>
                          <p className="text-gray-400 text-sm">{page.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white">{page.views.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-400">{page.lastModified}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-violet-400 hover:bg-violet-500/20 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useAuth } from "@/contexts/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Briefcase,
  BarChart3,
  X,
} from "lucide-react"

interface CMSSidebarProps {
  onClose?: () => void
}

export default function CMSSidebar({ onClose }: CMSSidebarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    {
      name: "Dashboard",
      href: "/cms/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/cms/dashboard",
    },
    {
      name: "Pages",
      href: "/cms/pages",
      icon: FileText,
      current: pathname === "/cms/pages",
    },
    {
      name: "Portfolio",
      href: "/cms/portfolio",
      icon: Briefcase,
      current: pathname === "/cms/portfolio",
    },
    {
      name: "Messages",
      href: "/cms/messages",
      icon: MessageSquare,
      current: pathname === "/cms/messages",
    },
    {
      name: "Analytics",
      href: "/cms/analytics",
      icon: BarChart3,
      current: pathname === "/cms/analytics",
    },
    {
      name: "Users",
      href: "/cms/users",
      icon: Users,
      current: pathname === "/cms/users",
      adminOnly: true,
    },
    {
      name: "Settings",
      href: "/cms/settings",
      icon: Settings,
      current: pathname === "/cms/settings",
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/cms/login")
    onClose?.()
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose?.()
  }

  return (
    <div className="cms-sidebar h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-sm">V</span>
          </div>
          <span className="text-lg font-bold text-white font-syne">VampForge</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/10 lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="bg-violet-500 text-white">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
          <Badge variant="outline" className="border-violet-500/50 text-violet-400 text-xs">
            {user?.role}
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          // Hide admin-only items for non-admin users
          if (item.adminOnly && user?.role !== "admin") {
            return null
          }

          return (
            <Button
              key={item.name}
              variant={item.current ? "secondary" : "ghost"}
              className={`w-full justify-start h-10 ${
                item.current
                  ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => handleNavigation(item.href)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-red-500/20"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import CMSSidebar from "@/components/cms/CMSSidebar"
import { Button } from "@/components/ui/button"
import { Menu, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Suspense } from "react"

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:inset-0
        `}
        >
          <CMSSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          {/* Top Navigation */}
          <header className="bg-gray-900/50 backdrop-blur-xl border-b border-white/10 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="text-white hover:bg-white/10 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <div className="hidden sm:flex items-center space-x-2 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Bell className="h-5 w-5" />
                </Button>

                <Suspense fallback={<div>Loading...</div>}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.full_name} />
                          <AvatarFallback className="bg-violet-500 text-white">
                            {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none text-white">{user.full_name || "User"}</p>
                          <p className="text-xs leading-none text-gray-400">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem
                        className="text-white hover:bg-gray-800 cursor-pointer"
                        onClick={() => router.push("/cms/profile")}
                      >
                        Profile Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-white hover:bg-gray-800 cursor-pointer"
                        onClick={() => router.push("/cms/dashboard")}
                      >
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem
                        className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Suspense>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto bg-gradient-to-br from-black via-gray-900 to-black">{children}</main>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function CMSSidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    { href: "/cms/dashboard", label: "Dashboard" },
    { href: "/cms/pages", label: "Pages" },
    { href: "/cms/messages", label: "Messages" },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-black/80 backdrop-blur-lg border-r border-white/10 hidden lg:block">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-8">VampForge CMS</h2>
        <nav className="space-y-3">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "block px-4 py-2 rounded-md text-sm transition-colors",
                pathname === href ? "bg-violet-600 text-white" : "text-gray-300 hover:bg-white/10",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button onClick={logout} className="mt-10 flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CMSLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/cms/dashboard")
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoCredentials = (type: "admin" | "editor") => {
    if (type === "admin") {
      setEmail("admin@vampforge.com")
      setPassword("VampForge2024!")
    } else {
      setEmail("editor@vampforge.com")
      setPassword("Editor2024!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">V</span>
            </div>
            <span className="text-2xl font-bold text-white font-syne">VampForge</span>
          </div>
          <p className="text-gray-400">Sign in to your CMS dashboard</p>
        </div>

        {/* Demo Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials("admin")}
            className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10"
          >
            Use Admin Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fillDemoCredentials("editor")}
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
          >
            Use Editor Demo
          </Button>
        </div>

        {/* Login Form */}
        <Card className="cms-card border-white/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Sign In</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access the CMS</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@vampforge.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="cms-input text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="cms-input text-white placeholder:text-gray-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full cms-button text-black font-semibold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link href="/cms/signup" className="text-violet-400 hover:text-violet-300 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Demo Credentials:</p>
          <p>Admin: admin@vampforge.com / VampForge2024!</p>
          <p>Editor: editor@vampforge.com / Editor2024!</p>
        </div>
      </div>
    </div>
  )
}

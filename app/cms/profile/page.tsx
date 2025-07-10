"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, User, Mail, Globe, Building, FileText, Camera } from "lucide-react"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    organization: "",
    bio: "",
    website: "",
    avatar_url: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        organization: user.organization || "",
        bio: user.bio || "",
        website: user.website || "",
        avatar_url: user.avatar_url || "",
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const { error } = await updateProfile(formData)
      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-syne">Profile Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account information and preferences</p>
        </div>
        <Badge variant="outline" className="border-violet-500/50 text-violet-400">
          {user.role}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="bg-gray-900/50 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Profile Overview</CardTitle>
            <CardDescription className="text-gray-400">Your account information at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar_url || "/placeholder.svg"} alt={user.full_name} />
                <AvatarFallback className="bg-violet-500 text-white text-lg">
                  {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-white">{user.full_name || "No name set"}</h3>
                <p className="text-gray-400">{user.email}</p>
                <Badge variant="outline" className="border-violet-500/50 text-violet-400 mt-1">
                  {user.role}
                </Badge>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="space-y-3">
              {user.organization && (
                <div className="flex items-center space-x-2 text-sm">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{user.organization}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300"
                  >
                    {user.website}
                  </a>
                </div>
              )}
              {user.bio && (
                <div className="flex items-start space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                  <p className="text-gray-300">{user.bio}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="lg:col-span-2 bg-gray-900/50 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Edit Profile</CardTitle>
            <CardDescription className="text-gray-400">Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <AlertDescription className="text-green-400">Profile updated successfully!</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-gray-300">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="pl-10 bg-gray-800/30 border-gray-700 text-gray-400 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-gray-300">
                    Organization
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      placeholder="Your company or organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-300">
                    Website
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar_url" className="text-gray-300">
                  Avatar URL
                </Label>
                <div className="relative">
                  <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="avatar_url"
                    name="avatar_url"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={formData.avatar_url}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-violet-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-violet-500 resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-violet-500 to-cyan-400 text-black font-semibold hover:from-violet-400 hover:to-cyan-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

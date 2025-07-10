"use client"

import { Suspense } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, FileText, MessageSquare, TrendingUp, Eye, Activity, Settings, Plus, BarChart3 } from "lucide-react"

function DashboardContent() {
  const { user } = useAuth()

  const stats = [
    {
      title: "Total Pages",
      value: "24",
      change: "+2 this week",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Messages",
      value: "156",
      change: "+12 today",
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      title: "Page Views",
      value: "12.5K",
      change: "+18% this month",
      icon: Eye,
      color: "text-purple-500",
    },
    {
      title: "Active Users",
      value: "2.4K",
      change: "+5% this week",
      icon: Users,
      color: "text-orange-500",
    },
  ]

  const recentActivity = [
    {
      action: "New contact message received",
      time: "2 minutes ago",
      type: "message",
    },
    {
      action: "Homepage content updated",
      time: "1 hour ago",
      type: "edit",
    },
    {
      action: "New portfolio project added",
      time: "3 hours ago",
      type: "create",
    },
    {
      action: "User registration completed",
      time: "5 hours ago",
      type: "user",
    },
    {
      action: "Services page published",
      time: "1 day ago",
      type: "publish",
    },
  ]

  const quickActions = [
    {
      title: "Create New Page",
      description: "Add a new page to your website",
      icon: Plus,
      action: () => console.log("Create page"),
    },
    {
      title: "View Analytics",
      description: "Check your website performance",
      icon: BarChart3,
      action: () => console.log("View analytics"),
    },
    {
      title: "Manage Settings",
      description: "Configure your website settings",
      icon: Settings,
      action: () => console.log("Manage settings"),
    },
  ]

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-syne">Welcome back, {user?.name}!</h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your website today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-violet-500/50 text-violet-400">
            {user?.role}
          </Badge>
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            Online
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="cms-card border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="cms-card border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-violet-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-400">Latest updates and changes to your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="cms-card border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-gray-400">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4 border-white/20 hover:border-violet-400/50 hover:bg-violet-400/10 bg-transparent"
                  onClick={action.action}
                >
                  <div className="flex items-start gap-3 text-left">
                    <action.icon className="h-5 w-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white text-sm">{action.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{action.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="cms-card border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-400" />
            Performance Overview
          </CardTitle>
          <CardDescription className="text-gray-400">Website metrics and analytics summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm text-gray-400 mt-1">Uptime</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-white">1.2s</div>
              <div className="text-sm text-gray-400 mt-1">Load Time</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-white">4.8/5</div>
              <div className="text-sm text-gray-400 mt-1">User Rating</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-white">95</div>
              <div className="text-sm text-gray-400 mt-1">SEO Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CMSDashboardPage() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-400">Loading dashboard…</div>}>
      <DashboardContent />
    </Suspense>
  )
}

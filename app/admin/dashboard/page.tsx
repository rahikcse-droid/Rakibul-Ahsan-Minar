"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Music,
  MessageSquare,
  TrendingUp,
  Eye,
  Clock,
  User,
  ArrowUpRight,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface DashboardStats {
  stats: {
    books: { total: number; published: number; draft: number };
    songs: { total: number; published: number; draft: number };
    contacts: { total: number; unread: number; read: number };
  };
  recent: {
    books: Array<{ _id: string; title: string; createdAt: string }>;
    songs: Array<{
      _id: string;
      title: string;
      artist: string;
      createdAt: string;
    }>;
    contacts: Array<{
      _id: string;
      name: string;
      email: string;
      createdAt: string;
      isRead: boolean;
    }>;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/dashboard/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card
                key={i}
                className="animate-pulse border-0 shadow-lg bg-white/80 backdrop-blur"
              >
                <CardHeader className="pb-3">
                  <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg w-1/2 mb-2"></div>
                  <div className="h-3 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Books",
      value: stats?.stats.books.total || 0,
      subtitle: `${stats?.stats.books.published || 0} published`,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      change: "+2.5%",
    },
    {
      title: "Total Songs",
      value: stats?.stats.songs.total || 0,
      subtitle: `${stats?.stats.songs.published || 0} published`,
      icon: Music,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      change: "+5.2%",
    },
    {
      title: "Messages",
      value: stats?.stats.contacts.total || 0,
      subtitle: `${stats?.stats.contacts.unread || 0} unread`,
      icon: MessageSquare,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      change: "+0.0%",
    },
    {
      title: "Growth",
      value: "+12%",
      subtitle: "vs last month",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      change: "+12%",
    },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      description="Welcome to your portfolio management system"
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                  Dashboard
                </h1>
                <p className="text-slate-600 text-lg">
                  Welcome to your portfolio management system
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>Last updated: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:-translate-y-1 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-slate-700 group-hover:text-slate-800 transition-colors">
                        {card.title}
                      </CardTitle>
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${card.bgColor} group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent
                          className={`h-5 w-5 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-slate-800 group-hover:scale-105 transition-transform origin-left">
                        {card.value}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500">
                          {card.subtitle}
                        </p>
                        <div className="flex items-center text-xs text-emerald-600 font-medium">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {card.change}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Books */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                      Recent Books
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Latest published books
                    </CardDescription>
                  </div>
                  <Eye className="h-4 w-4 text-slate-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recent.books.slice(0, 4).map((book, index) => (
                    <div
                      key={book._id}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                          {book.title}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">
                          {new Date(book.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!stats?.recent.books ||
                    stats.recent.books.length === 0) && (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No books yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Songs */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                      <Music className="h-5 w-5 mr-2 text-purple-600" />
                      Recent Songs
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Latest added songs
                    </CardDescription>
                  </div>
                  <Eye className="h-4 w-4 text-slate-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recent.songs.slice(0, 4).map((song, index) => (
                    <div
                      key={song._id}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 group-hover:text-purple-700 transition-colors truncate">
                          {song.title}
                        </p>
                        <p className="text-sm text-slate-500 mt-1 truncate">
                          by {song.artist}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!stats?.recent.songs ||
                    stats.recent.songs.length === 0) && (
                    <div className="text-center py-8">
                      <Music className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">No songs yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-emerald-600" />
                      Recent Messages
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Latest contact messages
                    </CardDescription>
                  </div>
                  <Eye className="h-4 w-4 text-slate-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recent.contacts.slice(0, 4).map((contact, index) => (
                    <div
                      key={contact._id}
                      className="group flex items-center justify-between p-3 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                            {contact.name}
                          </p>
                          <p className="text-sm text-slate-500 truncate">
                            {contact.email}
                          </p>
                        </div>
                      </div>
                      {!contact.isRead && (
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                  {(!stats?.recent.contacts ||
                    stats.recent.contacts.length === 0) && (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 mb-2">No messages yet</p>
                      <p className="text-xs text-slate-400">
                        Messages will appear here when received
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

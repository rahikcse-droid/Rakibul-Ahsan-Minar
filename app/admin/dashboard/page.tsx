"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Music, MessageSquare, TrendingUp } from 'lucide-react';

interface DashboardStats {
  stats: {
    books: { total: number; published: number; draft: number };
    songs: { total: number; published: number; draft: number };
    contacts: { total: number; unread: number; read: number };
  };
  recent: {
    books: Array<{ _id: string; title: string; createdAt: string }>;
    songs: Array<{ _id: string; title: string; artist: string; createdAt: string }>;
    contacts: Array<{ _id: string; name: string; email: string; createdAt: string; isRead: boolean }>;
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
      const response = await fetch('/api/admin/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Welcome to your portfolio management system
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.stats.books.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.stats.books.published || 0} published
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Songs</CardTitle>
              <Music className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.stats.songs.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.stats.songs.published || 0} published
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.stats.contacts.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                {stats?.stats.contacts.unread || 0} unread
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">
                vs last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Books */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Books</CardTitle>
              <CardDescription>Latest published books</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.recent.books.slice(0, 5).map((book) => (
                  <div key={book._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {book.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {(!stats?.recent.books || stats.recent.books.length === 0) && (
                  <p className="text-sm text-slate-500">No books yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Songs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Songs</CardTitle>
              <CardDescription>Latest added songs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.recent.songs.slice(0, 5).map((song) => (
                  <div key={song._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {song.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        by {song.artist}
                      </p>
                    </div>
                  </div>
                ))}
                {(!stats?.recent.songs || stats.recent.songs.length === 0) && (
                  <p className="text-sm text-slate-500">No songs yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Messages</CardTitle>
              <CardDescription>Latest contact messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.recent.contacts.slice(0, 5).map((contact) => (
                  <div key={contact._id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {contact.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {contact.email}
                      </p>
                    </div>
                    {!contact.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))}
                {(!stats?.recent.contacts || stats.recent.contacts.length === 0) && (
                  <p className="text-sm text-slate-500">No messages yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
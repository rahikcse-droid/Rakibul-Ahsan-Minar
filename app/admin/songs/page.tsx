// app\admin\songs\page.tsx
"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Play,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";

interface Song {
  _id: string;
  title: string;
  artist: string;
  link: string;
  category: string;
  isPublished: boolean;
  publishedDate: string;
  createdAt: string;
}

export default function AdminSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSongs();
  }, [currentPage, searchTerm, categoryFilter]);

  const fetchSongs = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        search: searchTerm,
        category: categoryFilter === "all" ? "" : categoryFilter,
      });

      const response = await fetch(`/api/admin/songs?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSongs(data.songs);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this song?")) return;

    try {
      const response = await fetch(`/api/admin/songs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSongs();
      }
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const togglePublished = async (id: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/songs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished: !isPublished }),
      });

      if (response.ok) {
        fetchSongs();
      }
    } catch (error) {
      console.error("Error updating song:", error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "nasheed":
        return "bg-green-100 text-green-800";
      case "protest":
        return "bg-red-100 text-red-800";
      case "spiritual":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6" suppressHydrationWarning={true}>
        <div
          className="flex justify-between items-center"
          suppressHydrationWarning={true}
        >
          <div suppressHydrationWarning={true}>
            <h1 className="text-3xl font-bold text-slate-800">Songs</h1>
            <p className="text-slate-600 mt-2">Manage your nasheed and songs</p>
          </div>
          <Link href="/admin/songs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Song
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card suppressHydrationWarning={true}>
          <CardContent className="pt-6" suppressHydrationWarning={true}>
            <div
              className="flex flex-col sm:flex-row gap-4"
              suppressHydrationWarning={true}
            >
              <div className="relative flex-1" suppressHydrationWarning={true}>
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="nasheed">Nasheed</SelectItem>
                  <SelectItem value="protest">Protest</SelectItem>
                  <SelectItem value="spiritual">Spiritual</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Songs List */}
        {isLoading ? (
          <div className="space-y-4" suppressHydrationWarning={true}>
            {[...Array(5)].map((_, i) => (
              <Card
                key={i}
                className="animate-pulse"
                suppressHydrationWarning={true}
              >
                <CardContent className="p-6" suppressHydrationWarning={true}>
                  <div
                    className="flex items-center justify-between"
                    suppressHydrationWarning={true}
                  >
                    <div
                      className="space-y-2 flex-1"
                      suppressHydrationWarning={true}
                    >
                      <div
                        className="h-4 bg-slate-200 rounded w-1/3"
                        suppressHydrationWarning={true}
                      ></div>
                      <div
                        className="h-3 bg-slate-200 rounded w-1/4"
                        suppressHydrationWarning={true}
                      ></div>
                    </div>
                    <div className="flex gap-2" suppressHydrationWarning={true}>
                      <div
                        className="h-8 w-8 bg-slate-200 rounded"
                        suppressHydrationWarning={true}
                      ></div>
                      <div
                        className="h-8 w-8 bg-slate-200 rounded"
                        suppressHydrationWarning={true}
                      ></div>
                      <div
                        className="h-8 w-8 bg-slate-200 rounded"
                        suppressHydrationWarning={true}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4" suppressHydrationWarning={true}>
            {songs.map((song) => (
              <Card key={song._id} suppressHydrationWarning={true}>
                <CardContent className="p-6" suppressHydrationWarning={true}>
                  <div
                    className="flex items-center justify-between"
                    suppressHydrationWarning={true}
                  >
                    <div
                      className="flex-1 min-w-0"
                      suppressHydrationWarning={true}
                    >
                      <div
                        className="flex items-center gap-3 mb-2"
                        suppressHydrationWarning={true}
                      >
                        <h3 className="font-semibold text-slate-800 truncate">
                          {song.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={getCategoryColor(song.category)}
                        >
                          {song.category}
                        </Badge>
                        <Badge
                          variant={song.isPublished ? "default" : "secondary"}
                        >
                          {song.isPublished ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">
                        Artist: {song.artist}
                      </p>
                      <p className="text-xs text-slate-500">
                        Created: {new Date(song.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div
                      className="flex gap-2 ml-4"
                      suppressHydrationWarning={true}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          togglePublished(song._id, song.isPublished)
                        }
                      >
                        {song.isPublished ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(song.link, "_blank")}
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                      <Link href={`/admin/songs/${song._id}`}>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(song._id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex justify-center gap-2"
            suppressHydrationWarning={true}
          >
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

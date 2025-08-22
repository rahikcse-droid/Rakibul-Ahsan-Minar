// app\admin\songs\new\page.tsx
"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface Singer {
  _id: string;
  name: string;
}

export default function NewSong() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    singerId: "none",
    link: "",
    category: "nasheed",
    isPublished: true,
    duration: "",
    description: "",
    lyrics: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [singers, setSingers] = useState<Singer[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchSingers();
  }, []);

  const fetchSingers = async () => {
    try {
      const response = await fetch("/api/admin/singers");
      if (response.ok) {
        const data = await response.json();
        setSingers(data.singers);
      }
    } catch (error) {
      console.error("Error fetching singers:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Prepare the data for submission
      const submitData = {
        ...formData,
        singerId: formData.singerId === "none" ? "" : formData.singerId,
      };

      const response = await fetch("/api/admin/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create song");
      }

      router.push("/admin/songs");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create song");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/songs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Add New Song</h1>
            <p className="text-slate-600 mt-2">Create a new song entry</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist *</Label>
                      <Input
                        id="artist"
                        value={formData.artist}
                        onChange={(e) =>
                          handleInputChange("artist", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="singer">Singer</Label>
                    <Select
                      value={formData.singerId}
                      onValueChange={(value) =>
                        handleInputChange("singerId", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a singer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Singer</SelectItem>
                        {singers.map((singer) => (
                          <SelectItem key={singer._id} value={singer._id}>
                            {singer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="link">YouTube Link *</Label>
                      <Input
                        id="link"
                        value={formData.link}
                        onChange={(e) =>
                          handleInputChange("link", e.target.value)
                        }
                        placeholder="https://youtu.be/..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) =>
                          handleInputChange("duration", e.target.value)
                        }
                        placeholder="3:45"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lyrics">Lyrics</Label>
                    <Textarea
                      id="lyrics"
                      value={formData.lyrics}
                      onChange={(e) =>
                        handleInputChange("lyrics", e.target.value)
                      }
                      rows={6}
                      placeholder="Enter song lyrics here..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published">Published</Label>
                    <Switch
                      id="published"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) =>
                        handleInputChange("isPublished", checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nasheed">Nasheed</SelectItem>
                      <SelectItem value="protest">Protest Song</SelectItem>
                      <SelectItem value="spiritual">Spiritual</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Save className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create Song
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

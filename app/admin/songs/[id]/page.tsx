"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface EditSongProps {
  params: { id: string };
}

export default function EditSong({ params }: EditSongProps) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    link: '',
    category: 'nasheed',
    isPublished: true,
    duration: '',
    description: '',
    lyrics: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchSong();
  }, [params.id]);

  const fetchSong = async () => {
    try {
      const response = await fetch(`/api/admin/songs/${params.id}`);
      if (response.ok) {
        const song = await response.json();
        setFormData({
          title: song.title || '',
          artist: song.artist || '',
          link: song.link || '',
          category: song.category || 'nasheed',
          isPublished: song.isPublished ?? true,
          duration: song.duration || '',
          description: song.description || '',
          lyrics: song.lyrics || '',
        });
      }
    } catch (error) {
      console.error('Error fetching song:', error);
      setError('Failed to load song data');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/songs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update song');
      }

      router.push('/admin/songs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update song');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoadingData) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

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
            <h1 className="text-3xl font-bold text-slate-800">Edit Song</h1>
            <p className="text-slate-600 mt-2">Update song information</p>
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
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist">Artist *</Label>
                      <Input
                        id="artist"
                        value={formData.artist}
                        onChange={(e) => handleInputChange('artist', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="link">YouTube Link *</Label>
                      <Input
                        id="link"
                        value={formData.link}
                        onChange={(e) => handleInputChange('link', e.target.value)}
                        placeholder="https://youtu.be/..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="3:45"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lyrics">Lyrics</Label>
                    <Textarea
                      id="lyrics"
                      value={formData.lyrics}
                      onChange={(e) => handleInputChange('lyrics', e.target.value)}
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
                      onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
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
                    onValueChange={(value) => handleInputChange('category', value)}
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
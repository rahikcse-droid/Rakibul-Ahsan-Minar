"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Singer {
  _id: string;
  name: string;
  image: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminSingers() {
  const [singers, setSingers] = useState<Singer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSingers();
  }, [currentPage, searchTerm]);

  const fetchSingers = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
      });

      const response = await fetch(`/api/admin/singers?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSingers(data.singers);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching singers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this singer?')) return;

    try {
      const response = await fetch(`/api/admin/singers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSingers();
      }
    } catch (error) {
      console.error('Error deleting singer:', error);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/singers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        fetchSingers();
      }
    } catch (error) {
      console.error('Error updating singer:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Singers</h1>
            <p className="text-slate-600 mt-2">Manage nasheed singers and artists</p>
          </div>
          <Link href="/admin/singers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Singer
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search singers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Singers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-48 bg-slate-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {singers.map((singer) => (
              <Card key={singer._id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={singer.image || '/placeholder.svg'}
                      alt={singer.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={singer.isActive ? 'default' : 'secondary'}>
                        {singer.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-800 truncate">
                      {singer.name}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {singer.bio || 'No bio available'}
                    </p>
                    <p className="text-xs text-slate-500">
                      Created: {new Date(singer.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleActive(singer._id, singer.isActive)}
                    >
                      {singer.isActive ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                    <Link href={`/admin/singers/${singer._id}`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(singer._id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
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
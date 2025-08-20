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
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Book {
  _id: string;
  title: string;
  subtitle: string;
  cover: string;
  orderLink: string;
  isPublished: boolean;
  publishedDate: string;
  createdAt: string;
}

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, [currentPage, searchTerm]);

  const fetchBooks = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
      });

      const response = await fetch(`/api/admin/books?${params}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data.books);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`/api/admin/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBooks();
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const togglePublished = async (id: string, isPublished: boolean) => {
    try {
      const response = await fetch(`/api/admin/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublished: !isPublished }),
      });

      if (response.ok) {
        fetchBooks();
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Books</h1>
            <p className="text-slate-600 mt-2">Manage your published books</p>
          </div>
          <Link href="/admin/books/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Book
            </Button>
          </Link>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Books Grid */}
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
            {books.map((book) => (
              <Card key={book._id} className="overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={book.cover || '/placeholder.svg'}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={book.isPublished ? 'default' : 'secondary'}>
                        {book.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-slate-800 truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {book.subtitle}
                    </p>
                    <p className="text-xs text-slate-500">
                      Created: {new Date(book.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePublished(book._id, book.isPublished)}
                    >
                      {book.isPublished ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                    <Link href={`/admin/books/${book._id}`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </Link>
                    {book.orderLink !== '#' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(book.orderLink, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(book._id)}
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
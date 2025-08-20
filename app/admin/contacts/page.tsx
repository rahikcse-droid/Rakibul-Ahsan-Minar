"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Search, 
  Mail, 
  MessageSquare, 
  Trash2,
  Eye,
  Reply
} from 'lucide-react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  reply?: string;
  createdAt: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [readFilter, setReadFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, [currentPage, searchTerm, readFilter]);

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
        isRead: readFilter,
      });

      const response = await fetch(`/api/admin/contacts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleReply = async () => {
    if (!selectedContact || !replyText.trim()) return;

    setIsReplying(true);
    try {
      const response = await fetch(`/api/admin/contacts/${selectedContact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          isRead: true,
          isReplied: true,
          reply: replyText 
        }),
      });

      if (response.ok) {
        setSelectedContact(null);
        setReplyText('');
        fetchContacts();
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Messages</h1>
            <p className="text-slate-600 mt-2">Manage contact form submissions</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={readFilter} onValueChange={setReadFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Messages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="false">Unread</SelectItem>
                  <SelectItem value="true">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact._id} className={!contact.isRead ? 'border-blue-200 bg-blue-50/30' : ''}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-800">
                          {contact.name}
                        </h3>
                        <Badge variant={contact.isRead ? 'secondary' : 'default'}>
                          {contact.isRead ? 'Read' : 'Unread'}
                        </Badge>
                        {contact.isReplied && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Replied
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        <Mail className="inline h-3 w-3 mr-1" />
                        {contact.email}
                      </p>
                      <p className="text-sm text-slate-700 mb-2 line-clamp-2">
                        {contact.message}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(contact.createdAt).toLocaleString()}
                      </p>
                      {contact.reply && (
                        <div className="mt-3 p-3 bg-slate-100 rounded-md">
                          <p className="text-xs font-medium text-slate-600 mb-1">Your Reply:</p>
                          <p className="text-sm text-slate-700">{contact.reply}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      {!contact.isRead && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(contact._id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedContact(contact);
                              setReplyText(contact.reply || '');
                            }}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Reply to {contact.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-md">
                              <p className="text-sm font-medium text-slate-700 mb-2">
                                Original Message:
                              </p>
                              <p className="text-sm text-slate-600">
                                {contact.message}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reply">Your Reply</Label>
                              <Textarea
                                id="reply"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={6}
                                placeholder="Type your reply here..."
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedContact(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleReply}
                                disabled={isReplying || !replyText.trim()}
                              >
                                {isReplying ? (
                                  <>
                                    <Reply className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                  </>
                                ) : (
                                  <>
                                    <Reply className="mr-2 h-4 w-4" />
                                    Send Reply
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(contact._id)}
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
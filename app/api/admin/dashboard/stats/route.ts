import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';
import Song from '@/models/Song';
import Contact from '@/models/Contact';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get basic counts
    const totalBooks = await Book.countDocuments();
    const publishedBooks = await Book.countDocuments({ isPublished: true });
    const totalSongs = await Song.countDocuments();
    const publishedSongs = await Song.countDocuments({ isPublished: true });
    const totalContacts = await Contact.countDocuments();
    const unreadContacts = await Contact.countDocuments({ isRead: false });

    // Get recent activities
    const recentBooks = await Book.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt');

    const recentSongs = await Song.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title artist createdAt');

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt isRead');

    // Get monthly stats for charts
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyBooks = await Book.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthlySongs = await Song.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const monthlyContacts = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    return NextResponse.json({
      stats: {
        books: {
          total: totalBooks,
          published: publishedBooks,
          draft: totalBooks - publishedBooks,
        },
        songs: {
          total: totalSongs,
          published: publishedSongs,
          draft: totalSongs - publishedSongs,
        },
        contacts: {
          total: totalContacts,
          unread: unreadContacts,
          read: totalContacts - unreadContacts,
        },
      },
      recent: {
        books: recentBooks,
        songs: recentSongs,
        contacts: recentContacts,
      },
      charts: {
        monthlyBooks,
        monthlySongs,
        monthlyContacts,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
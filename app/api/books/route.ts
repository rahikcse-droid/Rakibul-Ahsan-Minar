import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET(request: NextRequest) {
  try {
    console.log('Books API called');
    await connectDB();
    console.log('Database connected for books');
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0');
    
    let query = Book.find({ isPublished: true }).sort({ publishedDate: -1 });
    
    if (limit > 0) {
      query = query.limit(limit);
    }
    
    const books = await query;
    console.log(`Found ${books.length} books`);

    return NextResponse.json(books, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Get public books error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books', details: error.message },
      { status: 500 }
    );
  }
}
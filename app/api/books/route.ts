import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0');
    
    let query = Book.find({ isPublished: true }).sort({ publishedDate: -1 });
    
    if (limit > 0) {
      query = query.limit(limit);
    }
    
    const books = await query;

    return NextResponse.json(books);
  } catch (error) {
    console.error('Get public books error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Book from '@/models/Book';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

// GET all books
export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const query = search 
      ? { 
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { subtitle: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get books error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// CREATE new book
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const bookData = await request.json();
    const book = new Book(bookData);
    await book.save();

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
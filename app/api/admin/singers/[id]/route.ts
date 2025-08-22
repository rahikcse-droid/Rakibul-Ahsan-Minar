import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Singer from '@/models/Singer';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';

// GET single singer
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const singer = await Singer.findById(params.id);
    if (!singer) {
      return NextResponse.json({ error: 'Singer not found' }, { status: 404 });
    }

    return NextResponse.json(singer);
  } catch (error) {
    console.error('Get singer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// UPDATE singer
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const updateData = await request.json();
    const singer = await Singer.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!singer) {
      return NextResponse.json({ error: 'Singer not found' }, { status: 404 });
    }

    return NextResponse.json(singer);
  } catch (error) {
    console.error('Update singer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE singer
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const singer = await Singer.findByIdAndDelete(params.id);
    if (!singer) {
      return NextResponse.json({ error: 'Singer not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Singer deleted successfully' });
  } catch (error) {
    console.error('Delete singer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
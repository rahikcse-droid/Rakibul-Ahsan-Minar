import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Song from '@/models/Song';
import Singer from '@/models/Singer';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0');
    const category = searchParams.get('category') || '';
    const singerId = searchParams.get('singerId') || '';
    
    let query: any = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    if (singerId) {
      query.singerId = singerId;
    }
    
    let songQuery = Song.find(query).populate('singerId', 'name image').sort({ publishedDate: -1 });
    
    if (limit > 0) {
      songQuery = songQuery.limit(limit);
    }
    
    const songs = await songQuery;

    return NextResponse.json(songs);
  } catch (error) {
    console.error('Get public songs error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
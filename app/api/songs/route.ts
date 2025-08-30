import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Song from '@/models/Song';
import Singer from '@/models/Singer';

export async function GET(request: NextRequest) {
  try {
    console.log('Songs API called');
    await connectDB();
    console.log('Database connected');
    
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
    
    console.log('Query:', query);
    
    let songQuery = Song.find(query).populate('singerId', 'name image').sort({ publishedDate: -1 });
    
    if (limit > 0) {
      songQuery = songQuery.limit(limit);
    }
    
    const songs = await songQuery;
    console.log(`Found ${songs.length} songs`);

    return NextResponse.json(songs, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Get public songs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs', details: error.message },
      { status: 500 }
    );
  }
}
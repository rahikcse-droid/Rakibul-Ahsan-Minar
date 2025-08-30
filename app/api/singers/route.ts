import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Singer from '@/models/Singer';

export async function GET(request: NextRequest) {
  try {
    console.log('Singers API called');
    await connectDB();
    console.log('Database connected for singers');
    
    const singers = await Singer.find({ isActive: true }).sort({ order: 1 });
    console.log(`Found ${singers.length} singers`);

    return NextResponse.json(singers, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Get public singers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch singers', details: error.message },
      { status: 500 }
    );
  }
}
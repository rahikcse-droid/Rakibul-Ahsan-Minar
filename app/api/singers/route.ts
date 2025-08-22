import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Singer from '@/models/Singer';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const singers = await Singer.find({ isActive: true }).sort({ createdAt: -1 });

    return NextResponse.json(singers);
  } catch (error) {
    console.error('Get public singers error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
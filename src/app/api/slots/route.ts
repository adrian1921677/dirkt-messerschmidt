import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // const { searchParams } = new URL(request.url);
    // const month = searchParams.get('month');
    // const year = searchParams.get('year');

    // Mock-Daten für Demo-Zwecke
    const mockSlots = [
      {
        id: 'demo1',
        date: new Date(2024, 11, 20).toISOString(),
        startTime: '09:00',
        endTime: '10:00',
        status: 'PUBLISHED',
        isHoliday: false,
        isWeekend: false,
        maxBookings: 1,
        currentBookings: 0,
      },
      {
        id: 'demo2',
        date: new Date(2024, 11, 21).toISOString(),
        startTime: '14:00',
        endTime: '15:00',
        status: 'PUBLISHED',
        isHoliday: false,
        isWeekend: false,
        maxBookings: 1,
        currentBookings: 0,
      },
      {
        id: 'demo3',
        date: new Date(2024, 11, 22).toISOString(),
        startTime: '10:00',
        endTime: '11:00',
        status: 'PUBLISHED',
        isHoliday: false,
        isWeekend: false,
        maxBookings: 1,
        currentBookings: 0,
      },
    ];

    return NextResponse.json({ 
      success: true,
      slots: mockSlots 
    });

  } catch (error) {
    console.error('Slots fetch error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

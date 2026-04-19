import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { addDays, format, startOfDay } from 'date-fns';

const BOOKABLE_DAY_COUNT = 3;

const getBookableDates = () => {
  const dates: string[] = [];
  let cursor = addDays(startOfDay(new Date()), 2);

  while (dates.length < BOOKABLE_DAY_COUNT) {
    const dayOfWeek = cursor.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (!isWeekend) {
      dates.push(format(cursor, 'yyyy-MM-dd'));
    }

    cursor = addDays(cursor, 1);
  }

  return dates;
};

/**
 * GET /api/scheduling/slots
 * Fetch all available (active, future) time slots - including booked ones
 * Supports date filtering via ?date=YYYY-MM-DD query parameter
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const bookableDates = getBookableDates();

    // Start building the query - remove is_booked filter to show all slots
    let query = supabase
      .from('available_slots')
      .select('*')
      .eq('is_active', true)
      .order('slot_date', { ascending: true })
      .order('start_time', { ascending: true });

    // If a specific date is provided, filter by that date
    if (dateParam) {
      // Reject dates outside the next 3 allowed booking days.
      if (!bookableDates.includes(dateParam)) {
        return NextResponse.json({ success: true, data: [] });
      }

      query = query.eq('slot_date', dateParam);
    } else {
      // Otherwise, only include slots in the next 3 non-weekend booking days.
      query = query.in('slot_date', bookableDates);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error fetching slots:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch available slots' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error('Error in GET /api/scheduling/slots:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

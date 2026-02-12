import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/scheduling/slots
 * Fetch all available (not booked, active, future) time slots
 */
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('available_slots')
      .select('*')
      .eq('is_booked', false)
      .eq('is_active', true)
      .gte('slot_date', new Date().toISOString().split('T')[0])
      .order('slot_date', { ascending: true })
      .order('start_time', { ascending: true });

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

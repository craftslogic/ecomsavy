import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { leadCaptureSchema } from '@/lib/validation';

/**
 * POST /api/scheduling/lead
 * Create a new lead in the database
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = leadCaptureSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          details: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { full_name, email, phone } = validationResult.data;

    // Insert lead into database
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([
        {
          full_name,
          email,
          phone,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating lead:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to create lead',
          details: error.message || error.hint || 'Unknown database error'
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Lead created successfully',
    });
  } catch (error) {
    console.error('Error in POST /api/scheduling/lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

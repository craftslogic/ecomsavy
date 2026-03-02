import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const qualificationInputSchema = z.object({
  lead_id: z.string().uuid(),
  business_timeline: z.enum(['now', 'later', 'never']),
  investment_ready: z.boolean(),
  category_interest: z.enum(['skin_care', 'beard_oil', 'toys', 'home_kitchen']),
});

/**
 * POST /api/scheduling/qualification
 * Save qualification responses for a lead
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = qualificationInputSchema.safeParse(body);
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

    const { lead_id, business_timeline, investment_ready, category_interest } =
      validationResult.data;

    // Check if lead exists
    const { data: leadData, error: leadError } = await supabaseAdmin
      .from('leads')
      .select('id')
      .eq('id', lead_id)
      .single();

    if (leadError || !leadData) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Insert or update qualification response
    const { data, error } = await supabaseAdmin
      .from('qualification_responses')
      .upsert(
        [
          {
            lead_id,
            business_timeline,
            investment_ready,
            category_interest,
          },
        ],
        {
          onConflict: 'lead_id',
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Supabase error saving qualification:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save qualification' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Qualification saved successfully',
    });
  } catch (error) {
    console.error('Error in POST /api/scheduling/qualification:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}

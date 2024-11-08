import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server'



export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const updates = await request.json()
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('shipment')
    .update(updates)
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const supabase = await createClient();
  const { error } = await supabase
    .from('shipment')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'shipment item deleted successfully' })
}
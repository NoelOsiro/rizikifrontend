import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'


export async function GET() {
const supabase = await createClient();
  const { data, error } = await supabase.from('order').select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const order = await request.json()
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('order')
    .insert([order])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}
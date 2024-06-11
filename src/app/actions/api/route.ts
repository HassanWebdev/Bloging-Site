
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookiesStore = cookies();
  cookiesStore.delete('token');
  return NextResponse.json( { success: true });
}
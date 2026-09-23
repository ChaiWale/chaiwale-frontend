import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.chaiwale.co.in';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Invoice ID is required' }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();
    const targetUrl = `${BACKEND_URL}/api/v1/billing/public/invoice/${encodeURIComponent(id)}${queryString ? `?${queryString}` : ''}`;

    const backendRes = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      cache: 'no-store'
    });

    const data = await backendRes.json().catch(() => null);

    return NextResponse.json(data || { success: false, message: 'Failed to parse backend response' }, {
      status: backendRes.status
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Internal proxy error' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ success: false, message: 'Invoice ID is required' }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));

    const backendRes = await fetch(`${BACKEND_URL}/api/v1/billing/public/invoice/${encodeURIComponent(id)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
      cache: 'no-store'
    });

    const data = await backendRes.json().catch(() => null);

    return NextResponse.json(data || { success: false, message: 'Failed to parse backend response' }, {
      status: backendRes.status
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Internal proxy error' },
      { status: 500 }
    );
  }
}

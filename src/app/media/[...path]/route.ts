import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_BUCKETS = new Set(['branding', 'menu', 'catering']);
const SUPABASE_STORAGE_URL = 'https://hwbdyuupfobpznfroapa.supabase.co/storage/v1/object/public';

const MIME_TYPES: Record<string, string> = {
  webp: 'image/webp',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  gif: 'image/gif',
  ico: 'image/x-icon'
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;

  if (!segments || segments.length === 0) {
    return new NextResponse('Media path required', { status: 400 });
  }

  const bucket = segments[0].toLowerCase();
  const objectPath = segments.slice(1).join('/');

  // SECURITY GUARD: Strictly prohibit access to private buckets
  if (!PUBLIC_BUCKETS.has(bucket)) {
    return NextResponse.json(
      {
        error: 'Forbidden',
        message: 'Access to private documents and invoices is strictly disallowed via public media endpoint'
      },
      { status: 403 }
    );
  }

  if (!objectPath) {
    return new NextResponse('Object path required', { status: 400 });
  }

  // Construct origin Supabase storage URL (server-side only)
  const targetUrl = `${SUPABASE_STORAGE_URL}/${bucket}/${objectPath}`;

  try {
    const res = await fetch(targetUrl, {
      next: { revalidate: 86400 } // Cache for 24h
    });

    if (!res.ok) {
      return new NextResponse('Media not found', { status: res.status });
    }

    const contentType =
      res.headers.get('content-type') ||
      MIME_TYPES[objectPath.split('.').pop()?.toLowerCase() || ''] ||
      'application/octet-stream';

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400');

    return new NextResponse(res.body, {
      status: 200,
      headers
    });
  } catch (err: any) {
    return new NextResponse(`Error proxying media: ${err.message}`, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    const { folderId } = await params;
    const apiKey = process.env.DRIVE_API_KEY;

    if (!folderId || !apiKey) {
      return NextResponse.json(
        { error: 'Missing credentials.' },
        { status: 500 }
      );
    }

    const endpoint = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name,mimeType)&orderBy=name&key=${apiKey}`;

    const response = await fetch(endpoint, { next: { revalidate: 3600 } });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to fetch images' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

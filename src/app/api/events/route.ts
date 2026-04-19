import { NextResponse } from 'next/server';
import { events } from '../../../data/events';

export async function GET() {
  const apiKey = process.env.DRIVE_API_KEY;

  if (!apiKey) {
    // Return events metadata without photo counts if Drive API key is missing
    return NextResponse.json(events.map((e) => ({ ...e, photoCount: null })));
  }

  // Fetch photo counts for all event folders in parallel
  const eventsWithCounts = await Promise.all(
    events.map(async (event) => {
      try {
        const q = encodeURIComponent(`'${event.folderId}' in parents and mimeType contains 'image/'`);
        const endpoint = `https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id)&key=${apiKey}`;
        const res = await fetch(endpoint, {
          next: { revalidate: 3600 },
          headers: { Referer: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000' },
        });
        if (!res.ok) return { ...event, photoCount: null };
        const data = await res.json();
        return { ...event, photoCount: (data.files as unknown[])?.length ?? null };
      } catch {
        return { ...event, photoCount: null };
      }
    })
  );

  return NextResponse.json(eventsWithCounts);
}

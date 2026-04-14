import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const useMock = process.env.USE_MOCK_API === 'true';

    if (useMock) {

      const mockData = Array.from({ length: 6 }).map((_, i) => ({
        id: `mock-${i}`,
        name: `Office Bearer ${i + 1}`,
        mimeType: 'image/jpeg',
        webContentLink: `https://picsum.photos/seed/${i + 1}/400/600`,
        thumbnailLink: `https://picsum.photos/seed/${i + 1}/150/225`
      }));

      return NextResponse.json({ files: mockData });
    }

    // --- Original Google Drive Logic ---
    const folderId = process.env.DRIVE_FOLDER_ID;
    const apiKey = process.env.DRIVE_API_KEY;

    if (!folderId || !apiKey) {
      return NextResponse.json(
        { error: "Missing Google Drive API credentials." },
        { status: 500 }
      );
    }

    const endpoint = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType+contains+'image/'&fields=files(id,name,mimeType,webContentLink,thumbnailLink)&key=${apiKey}`;

    const response = await fetch(endpoint, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to fetch images from Google Drive API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Error fetching event images:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

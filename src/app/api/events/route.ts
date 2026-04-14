import { NextResponse } from 'next/server';

export async function GET() {
  try {
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
      next: { revalidate: 3600 } // optionally cache the response for an hour
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

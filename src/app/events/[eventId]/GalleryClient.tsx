'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Event } from '../../../data/events';
import './gallery.css';

interface DriveFile {
  id: string;
  name: string;
}

interface Props {
  event: Event;
}

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function GalleryClient({ event }: Props) {
  const [photos, setPhotos] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(`/api/gallery/${event.folderId}`);
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || 'Failed to load photos');
        }
        const data = await res.json();
        setPhotos(data.files || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [event.folderId]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, photos.length]);

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        {/* Back link */}
        <Link href="/events" className="gallery-back-link">
          <ArrowLeftIcon />
          All Events
        </Link>

        {/* Header */}
        <div className="gallery-header">
          <h1 className="gallery-title">{event.title}</h1>
          <p className="gallery-date">{event.date}</p>
          {!isLoading && !error && photos.length > 0 && (
            <p className="gallery-count">{photos.length} photos</p>
          )}
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="gallery-grid">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="gallery-skeleton" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="gallery-error">
            <h3>Could not load photos</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Photo grid */}
        {!isLoading && !error && photos.length > 0 && (
          <div className="gallery-grid">
            {photos.map((photo, idx) => (
              <button
                key={photo.id}
                className="gallery-item"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Open photo ${idx + 1}`}
              >
                <img
                  src={`https://drive.google.com/thumbnail?id=${photo.id}&sz=w400`}
                  alt={photo.name}
                  className="gallery-item-img"
                  loading="lazy"
                />
                <div className="gallery-item-hover" />
              </button>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && photos.length === 0 && (
          <div className="gallery-empty">
            <p>No photos uploaded yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close">
              <CloseIcon />
            </button>

            <button
              className="lightbox-nav lightbox-prev"
              onClick={() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i))}
              disabled={lightboxIndex === 0}
              aria-label="Previous photo"
            >
              <ChevronLeft />
            </button>

            <img
              src={`https://drive.google.com/thumbnail?id=${photos[lightboxIndex].id}&sz=w1200`}
              alt={photos[lightboxIndex].name}
              className="lightbox-img"
            />

            <button
              className="lightbox-nav lightbox-next"
              onClick={() => setLightboxIndex((i) => (i !== null && i < photos.length - 1 ? i + 1 : i))}
              disabled={lightboxIndex === photos.length - 1}
              aria-label="Next photo"
            >
              <ChevronRight />
            </button>

            <div className="lightbox-counter">
              {lightboxIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

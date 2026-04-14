'use client'

import React, { useState, useEffect } from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';
import EventsCard from './EventsCard/EventsCard';
import './EventsSection.css';

const EventsSection = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/events');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch images");
        }

        const data = await response.json();
        setImages(data.files || []);
      } catch (err) {
        console.error("Error fetching event images:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="events-section">
      <div className="events-container">
        <SectionHeader title="Office Bearers" subtitle="Meet the team behind the events" />

        {/* Loading State */}
        {isLoading && (
          <div className="office-bearers-grid mt-top">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="events-error mt-top">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Image Grid */}
        {!isLoading && !error && images.length > 0 && (
          <div className="office-bearers-grid mt-top">
            {images.map((img) => (
              <EventsCard
                key={img.id}
                poster={img.webContentLink || img.thumbnailLink}
                title={img.name?.replace(/\.[^/.]+$/, "")}
                link={img.webContentLink}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;

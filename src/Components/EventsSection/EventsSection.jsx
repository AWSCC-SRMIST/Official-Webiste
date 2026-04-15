'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SectionHeader from '../SectionHeader/SectionHeader';
import EventCard from './EventCard/EventCard';
import './EventsSection.css';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="events-section">
      <div className="events-container">
        <SectionHeader title="Events" subtitle="Workshops, bootcamps, and more" />

        <div className="events-certs-link-wrap">
          <Link href="/certificates" className="events-certs-link">
            🎓 View Certificates
          </Link>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="events-grid mt-top">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="event-skeleton-card" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="events-error mt-top">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Event grid */}
        {!isLoading && !error && events.length > 0 && (
          <div className="events-grid mt-top">
            {events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                coverImageId={event.coverImageId}
                highlights={event.highlights}
                photoCount={event.photoCount}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && events.length === 0 && (
          <div className="events-empty">
            <div className="events-empty-icon">
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                <rect x="10" y="18" width="60" height="52" rx="8" fill="rgba(184,54,254,0.1)" stroke="#B836FE" strokeWidth="1.5" />
                <rect x="10" y="18" width="60" height="16" rx="8" fill="rgba(184,54,254,0.2)" />
                <rect x="10" y="26" width="60" height="8" fill="rgba(184,54,254,0.2)" />
                <line x1="26" y1="10" x2="26" y2="26" stroke="#B836FE" strokeWidth="2" strokeLinecap="round" />
                <line x1="54" y1="10" x2="54" y2="26" stroke="#B836FE" strokeWidth="2" strokeLinecap="round" />
                <circle cx="40" cy="52" r="10" fill="rgba(184,54,254,0.15)" stroke="#FA46F2" strokeWidth="1.5" />
                <text x="40" y="57" textAnchor="middle" fill="#FA46F2" fontSize="12" fontFamily="monospace">?</text>
              </svg>
            </div>
            <p className="events-empty-text">Events Coming Soon</p>
            <p className="events-empty-sub">Follow us on social media to stay updated!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;

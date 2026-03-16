'use client'

import React from 'react';
import Lottie from 'lottie-react';
import noEventsAnimation from '../../assets/animation/noEvents.json';
import SectionHeader from '../SectionHeader/SectionHeader';
import './EventsSection.css';

const EventsSection = () => {
  return (
    <section className="events-section">
      <div className="events-container">
        <SectionHeader title="Events" subtitle="Workshops, bootcamps, and more" />
        <div className="events-empty">
          <Lottie animationData={noEventsAnimation} loop={true} style={{ width: 200, height: 200 }} />
          <p className="events-empty-text">Events Coming Soon</p>
          <p className="events-empty-sub">Follow us on social media to stay updated!</p>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

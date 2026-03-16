'use client'

import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import ImageGallery from 'react-image-gallery';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import momentsAnimation from '../../assets/animation/moments.json';
import SectionHeader from '../SectionHeader/SectionHeader';
import 'react-image-gallery/styles/image-gallery.css';
import './GallerySection.css';

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      // Firebase not configured yet — show empty state immediately
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      try {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const imgs = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            original: data.url,
            thumbnail: data.thumbnailUrl || data.url,
            description: data.caption || '',
            originalTitle: data.eventName || '',
          };
        });
        setImages(imgs);
      } catch (err) {
        console.error('Failed to fetch gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <SectionHeader
          title="Moments"
          subtitle="Memories from our events and workshops"
        />

        {loading && (
          <div className="gallery-loading">
            <div className="gallery-spinner"></div>
            <p className="gallery-loading-text">Loading moments...</p>
          </div>
        )}

        {!loading && images.length === 0 && (
          <div className="gallery-empty">
            <Lottie animationData={momentsAnimation} loop={true} style={{ width: 220, height: 220 }} />
            <p className="gallery-empty-text">No moments here yet.</p>
            <p className="gallery-empty-sub">Check back after our next event!</p>
          </div>
        )}

        {!loading && images.length > 0 && (
          <div className="gallery-viewer">
            <ImageGallery
              items={images}
              thumbnailPosition={window.innerWidth >= 768 ? 'right' : 'bottom'}
              showPlayButton={true}
              showFullscreenButton={true}
              showBullets={false}
              showNav={true}
              lazyLoad={true}
              slideInterval={4000}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;

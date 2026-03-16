'use client'

import React from 'react';
import Lottie from 'lottie-react';
import aboutAnimation from '../../assets/animation/about.json';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-col-text">
          <div className="about-block">
            <h3 className="side-head about-subhead">Who We Are</h3>
            <p className="para">
              AWS Cloud Clubs - SRMIST is a student-led community for builders exploring the intersection of cloud computing, software development, AI/ML, and DevOps within the AWS ecosystem. Through hands-on workshops, real-world projects, and technical sessions, we enable students to learn, build, and deploy modern cloud-native systems. Our focus is simple: turn curious students into capable builders by giving them the environment, tools, and community to experiment and innovate.
            </p>
          </div>

          <div className="about-block" style={{ marginTop: '32px' }}>
            <h3 className="side-head about-subhead">What We Do</h3>
            <p className="para">
              We organise hands-on workshops on AWS services, certification bootcamps for AWS Cloud Practitioner and beyond, industry speaker sessions, hackathons, and networking events — all designed to bridge the gap between academic learning and industry needs.
            </p>
            <div className="about-tags">
              {['Workshops', 'Hackathons', 'Speaker Sessions', 'Cert Bootcamps', 'Networking', 'Projects'].map((t, i) => (
                <span key={i} className="about-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="about-col-visual">
          <div className="about-lottie-wrapper">
            <Lottie animationData={aboutAnimation} loop={true} style={{ width: '100%', maxWidth: 380 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

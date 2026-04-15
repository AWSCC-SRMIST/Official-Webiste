import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { events } from '../../../data/events';
import NavBar from '../../../Components/NavBar/NavBar';
import Footer from '../../../Components/Footer/Footer';
import GalleryClient from './GalleryClient';

interface Props {
  params: { eventId: string };
}

export async function generateStaticParams() {
  return events.map((e) => ({ eventId: e.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = events.find((e) => e.id === params.eventId);
  if (!event) return { title: 'Event Not Found | AWSCC-SRMIST' };
  return {
    title: `${event.title} | AWSCC-SRMIST`,
    description: `Photo gallery for ${event.title} — ${event.date}`,
  };
}

export default function EventGalleryPage({ params }: Props) {
  const event = events.find((e) => e.id === params.eventId);
  if (!event) notFound();

  return (
    <>
      <NavBar />
      <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <GalleryClient event={event} />
        </div>
        <Footer />
      </div>
    </>
  );
}

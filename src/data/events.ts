/**
 * Events data for the AWSCC-SRMIST website.
 *
 * HOW TO ADD A NEW EVENT:
 * 1. Create a subfolder in your Google Drive events folder.
 * 2. Upload all event photos into that subfolder.
 * 3. Copy the subfolder's ID from the URL (the long string after /folders/).
 * 4. Open the subfolder, pick the cover photo, copy its file ID from the URL.
 * 5. Add a new entry below following the same format.
 *
 * NOTE: Keep events in reverse-chronological order (newest first).
 */

export interface Event {
  id: string;
  title: string;
  date: string;
  folderId: string;      // Google Drive folder ID — contains all photos for this event
  coverImageId: string;  // Google Drive file ID for the cover/hero photo
  highlights: string[];  // Up to 3 bullet points shown on the card
}

export const events: Event[] = [
  {
    id: "cloudsprint-devops-2026",
    title: "CloudSprint DevOps Challenge",
    date: "25–28 February 2026",
    folderId: "REPLACE_WITH_DRIVE_FOLDER_ID",
    coverImageId: "REPLACE_WITH_COVER_IMAGE_ID",
    highlights: [
      "AWS Cloud & DevOps fundamentals",
      "Automation and real-world problem solving",
      "Team-based challenges",
    ],
  },
  {
    id: "containerization-101-2026",
    title: "Containerization 101",
    date: "19–20 February 2026",
    folderId: "REPLACE_WITH_DRIVE_FOLDER_ID",
    coverImageId: "REPLACE_WITH_COVER_IMAGE_ID",
    highlights: [
      "Containers & Docker fundamentals",
      "Docker CLI hands-on",
      "Containerizing applications",
    ],
  },
  {
    id: "build-ai-games-2025",
    title: "Build AI Games with Python × Amazon Q",
    date: "28 November 2025",
    folderId: "REPLACE_WITH_DRIVE_FOLDER_ID",
    coverImageId: "REPLACE_WITH_COVER_IMAGE_ID",
    highlights: [
      "Python for game logic",
      "Amazon Q introduction",
      "AI-assisted development",
    ],
  },
  {
    id: "innotech-kiet-2025",
    title: "Innotech KIET – CloudFusion",
    date: "15 November 2025",
    folderId: "REPLACE_WITH_DRIVE_FOLDER_ID",
    coverImageId: "REPLACE_WITH_COVER_IMAGE_ID",
    highlights: [
      "Cloud-based problem statements",
      "Team competition",
      "Practical AWS thinking",
    ],
  },
  {
    id: "cloudnova-2025",
    title: "CloudNova",
    date: "23–25 September 2025",
    folderId: "REPLACE_WITH_DRIVE_FOLDER_ID",
    coverImageId: "REPLACE_WITH_COVER_IMAGE_ID",
    highlights: [
      "AWS Cloud Fundamentals",
      "Linux for Cloud Engineers",
      "Compute, Storage & Networking",
    ],
  },
  {
    id: "student-induction-2025",
    title: "Student Induction Program",
    date: "12 September 2025",
    folderId: "REPLACE_WITH_DRIVE_FOLDER_ID",
    coverImageId: "REPLACE_WITH_COVER_IMAGE_ID",
    highlights: [
      "Club introduction & roadmap",
      "Cloud & DevOps awareness",
      "Orientation for first-year students",
    ],
  },
];

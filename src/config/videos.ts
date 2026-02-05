/**
 * YouTube Video Configuration
 * 
 * Instructions:
 * 1. Upload your videos to YouTube
 * 2. Get the video ID from the URL (e.g., for https://youtube.com/watch?v=dQw4w9WgXcQ, the ID is "dQw4w9WgXcQ")
 * 3. Replace the IDs below with your actual video IDs
 * 4. Optional: Add custom poster images in the public folder for better branding
 */

export const videoConfig = {
  // Hero section video
  hero: {
    videoId: "VNBABAwqbyU", // TODO: Replace with your hero video ID
    title: "How to Build a Wildly Profitable Ecommerce Store",
    posterImage: "/videos/hero-poster.png", // Optional: Add this image to public/videos/
  },

  // Testimonial videos
  testimonials: [
    {
      videoId: "dQw4w9WgXcQ", // TODO: Replace with Hamza's video ID
      name: "Hamza",
      company: "From Tabbanis",
    },
    {
      videoId: "dQw4w9WgXcQ", // TODO: Replace with Jahangir's video ID
      name: "Jahangir",
      company: "From Seven Edge",
    },
    {
      videoId: "dQw4w9WgXcQ", // TODO: Replace with Abdul Hannan's video ID
      name: "Abdul Hannan",
      company: "From Hype Pillow",
    },
    {
      videoId: "dQw4w9WgXcQ", // TODO: Replace with Rehan's video ID
      name: "Rehan",
      company: "From Paper Cut",
    },
  ],
} as const;

/**
 * Helper function to get YouTube thumbnail URL
 * Uses maxresdefault for best quality, falls back to hqdefault if not available
 */
export function getYouTubeThumbnail(videoId: string, quality: 'max' | 'high' | 'medium' = 'max'): string {
  const qualityMap = {
    max: 'maxresdefault',
    high: 'hqdefault',
    medium: 'mqdefault',
  };
  
  return `https://i.ytimg.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

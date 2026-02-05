"use client";

import { useState } from "react";
import Image from "next/image";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  posterImage?: string;
  className?: string;
  aspectRatio?: "video" | "square";
}

export default function YouTubeEmbed({
  videoId,
  title,
  posterImage,
  className = "",
  aspectRatio = "video",
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate high-quality thumbnail from YouTube if no poster provided
  const thumbnailUrl = posterImage || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  
  const handlePlayClick = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={`relative w-full ${
        aspectRatio === "video" ? "aspect-video" : "aspect-square"
      } ${className}`}
    >
      {!isLoaded ? (
        <>
          {/* Poster Image */}
          <div className="absolute inset-0 bg-black">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
              priority={aspectRatio === "video"} // Priority only for hero video
              sizes={aspectRatio === "video" ? "(max-width: 768px) 100vw, 896px" : "(max-width: 768px) 100vw, 300px"}
            />
          </div>

          {/* Play Button Overlay */}
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group cursor-pointer"
            aria-label={`Play video: ${title}`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all transform group-hover:scale-110 shadow-lg">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-white fill-current ml-1"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <polygon points="8 5 19 12 8 19" />
              </svg>
            </div>
          </button>

          {/* Optional: Duration badge */}
          {aspectRatio === "video" && (
            <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded">
              Video
            </div>
          )}
        </>
      ) : (
        /* YouTube iframe - loaded only after click */
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />
      )}
    </div>
  );
}

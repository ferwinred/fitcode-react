"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FreeBadge } from "@/components/badges";
import { videoService } from "@/src/services";
import { useFavorites } from "@/context/favorites-context";
import { formatDuration } from "@/lib/mock-data";
import type { WorkoutVideoView } from "@/lib/types";
import { isApiClientError } from "@/src/infrastructure/api/ApiClientError";
import { useAuth } from "@/context/auth-context";

function getYoutubeVideoId(url?: string) {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^"&?/\s]{11})/;

  const match = url.match(regExp);

  return match?.[1] ?? null;
}

export default function VideosPage() {
  const { isVideoFavorite, toggleVideo } = useFavorites();
  const { logout } = useAuth();

  const [videos, setVideos] = useState<WorkoutVideoView[]>([]);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  useEffect(() => {
    try {
      videoService.getAll().then(setVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      if (isApiClientError(error)) {
        if (error.status === 401) {
          // Aquí podrías agregar lógica para manejar la expiración del token, como redirigir al login
          console.log("Token expirado. Redirigiendo al login...");
          logout();
        }
      }
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Videos</h1>

        <p className="text-muted-foreground">
          Tutoriales y entrenamientos en video
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.map((v) => {
          const videoId = getYoutubeVideoId(v.url);

          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
            : v.thumbnail_url;

          const isHovered = hoveredVideo === v.id;

          return (
            <div
              key={v.id}
              className="relative group"
              onMouseEnter={() => setHoveredVideo(v.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <Link href={`/videos/${v.id}`}>
                <Card className="overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  {/* VIDEO PREVIEW */}
                  <div className="relative h-52 bg-black overflow-hidden">
                    {/* Hover Preview */}
                    {isHovered && videoId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0`}
                        title={v.title}
                        allow="autoplay"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                      />
                    ) : (
                      <img
                        src={thumbnail ?? ""}
                        alt={v.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20 pointer-events-none" />

                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                      </div>
                    </div>

                    {/* Free badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <FreeBadge isFree={v.is_free} />
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 z-10 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded-md">
                      {formatDuration(v.duration_seconds ?? 0)}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <CardContent className="p-4 space-y-2">
                    <p className="font-semibold text-sm line-clamp-2 leading-relaxed">
                      {v.title}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground capitalize">
                        {v.video_type}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        ❤️ {v.likes}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* FAVORITE BUTTON */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  toggleVideo(v.id);
                }}
                className="absolute top-2 right-2 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-4 h-4 transition-colors cursor-pointer ${
                    isVideoFavorite(v.id)
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

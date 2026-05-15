"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FreeBadge } from "@/components/badges";
import { getFreeVideos } from "@/lib/services/data-service";
import { formatDuration } from "@/lib/mock-data";
import type { WorkoutVideoView } from "@/lib/types";
import { useFavorites } from "@/context/favorites-context";

export default function LandingFreeVideos() {
  const [videos, setVideos] = useState<WorkoutVideoView[]>([]);
  const [loading, setLoading] = useState(true);
  const { isVideoFavorite, toggleVideo } = useFavorites();
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);

  useEffect(() => {
    getFreeVideos(2).then((data) => {
      setVideos(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Videos gratuitos</h2>
          <Link href="/videos" className="text-sm text-amber-600 hover:text-amber-500 font-medium flex items-center gap-1">
            Ver todos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {[1, 2].map((i) => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
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
                  className={`w-4 h-4 transition-colors ${
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
        )}
      </div>
    </section>
  );
}

function getYoutubeVideoId(url?: string) {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^"&?/\s]{11})/;

  const match = url.match(regExp);

  return match?.[1] ?? null;
}
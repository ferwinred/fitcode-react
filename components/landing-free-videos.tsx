"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FreeBadge } from "@/components/badges";
import { mockVideos, formatDuration } from "@/lib/mock-data";

interface Video {
  id: number;
  title: string;
  thumbnail_url: string;
  duration_seconds: number;
  video_type: string;
  likes: number;
  is_free: boolean;
}

export default function LandingFreeVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: reemplazar con fetch(`/api/videos?free=true&limit=2`) cuando el backend esté listo
    const load = async () => {
      await new Promise((r) => setTimeout(r, 0));
      setVideos(mockVideos.filter((v) => v.is_free).slice(0, 2));
      setLoading(false);
    };
    load();
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
            {[1, 2].map((i) => (
              <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {videos.map((v) => (
              <Link key={v.id} href={`/videos/${v.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 group">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={v.thumbnail_url}
                      alt={v.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <FreeBadge isFree={v.is_free} />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                      {formatDuration(v.duration_seconds)}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="font-semibold text-sm">{v.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">❤️ {v.likes} likes</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

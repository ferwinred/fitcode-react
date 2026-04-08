import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FreeBadge } from "@/components/badges";
import { mockVideos, formatDuration } from "@/lib/mock-data";

export default function VideosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Videos</h1>
        <p className="text-muted-foreground">Tutoriales y entrenamientos en video</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockVideos.map((v) => (
          <Link key={v.id} href={`/videos/${v.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-0.5 group">
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image src={v.thumbnail_url ?? ''} alt={v.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-gray-900 ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-2 left-2"><FreeBadge isFree={v.is_free} /></div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                  {formatDuration(v.duration_seconds ?? 0)}
                </div>
              </div>
              <CardContent className="p-4 space-y-1">
                <p className="font-semibold text-sm line-clamp-2">{v.title}</p>
                <p className="text-xs text-muted-foreground capitalize">{v.video_type} · ❤️ {v.likes}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Bookmark, Share2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DifficultyBadge, FreeBadge } from "@/components/badges";
import { mockVideos, formatDuration } from "@/lib/mock-data";

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const video = mockVideos.find((v) => v.id === Number(params.id)) ?? mockVideos[0];
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(video.likes ?? 0);

  const handleLike = () => {
    setLiked((l) => !l);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/videos" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Volver a videos
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Player */}
        <div className="md:col-span-2 space-y-4">
          {video.is_free ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center">
              <div className="text-center space-y-3 p-6">
                <Lock className="w-12 h-12 text-amber-400 mx-auto" />
                <p className="text-white font-bold text-lg">Contenido Premium</p>
                <p className="text-white/60 text-sm">Suscríbete para ver este video completo</p>
                <Button asChild className="bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl">
                  <Link href="/pricing">Ver planes</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={liked ? "border-red-300 text-red-500 bg-red-50 dark:bg-red-950/20" : ""}
              >
                <Heart className={`w-4 h-4 mr-1 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                {likes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSaved((s) => !s)}
                className={saved ? "border-amber-300 text-amber-600 bg-amber-50 dark:bg-amber-950/20" : ""}
              >
                <Bookmark className={`w-4 h-4 mr-1 ${saved ? "fill-amber-500 text-amber-500" : ""}`} />
                {saved ? "Guardado" : "Guardar"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" /> Compartir
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">{formatDuration(video.duration_seconds ?? 0)}</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <p className="text-muted-foreground text-sm mt-1 capitalize">{video.video_type}</p>
          </div>

          {/* Comments placeholder */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-sm">Comentarios</p>
              <div className="space-y-3">
                {[
                  { user: "Ana G.", comment: "Excelente técnica explicada, muy claro!", time: "2h" },
                  { user: "Luis M.", comment: "Llevo 3 semanas con este ejercicio y noto la diferencia.", time: "1d" },
                ].map(({ user, comment, time }) => (
                  <div key={user} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {user[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user} <span className="text-muted-foreground font-normal text-xs">{time}</span></p>
                      <p className="text-sm text-muted-foreground">{comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-3">
              <p className="font-semibold text-sm">Información</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo</span>
                  <span className="capitalize font-medium">{video.video_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duración</span>
                  <span className="font-medium">{formatDuration(video.duration_seconds ?? 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Acceso</span>
                  <FreeBadge isFree={video.is_free} />
                </div>
              </div>
            </CardContent>
          </Card>

          {video.workout && (
            <Card>
              <CardContent className="p-4 space-y-3">
                <p className="font-semibold text-sm">Ejercicio relacionado</p>
                <Link href={`/workouts/${video.workout.id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{video.workout.title}</p>
                    <DifficultyBadge difficulty={video.workout.difficulty} />
                  </div>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

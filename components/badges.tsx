import { cn } from "@/lib/utils";
import { difficultyColor, difficultyLabel } from "@/lib/mock-data";

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", difficultyColor[difficulty] ?? "bg-gray-100 text-gray-600")}>
      {difficultyLabel[difficulty] ?? difficulty}
    </span>
  );
}

export function FreeBadge({ isFree }: { isFree: boolean }) {
  return isFree ? (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Gratis</span>
  ) : (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Premium</span>
  );
}

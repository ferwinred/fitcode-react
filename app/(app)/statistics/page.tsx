import Image from "next/image";

import chart2 from "@/src/assets/graficos/usuarios_por_sexo.png";
import chart1 from "@/src/assets/graficos/duracion_por_dificultad.png";
import chart3 from "@/src/assets/graficos/duracion_promedio_lineas.png";
import chart4 from "@/src/assets/graficos/no-image.jpg";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const charts = [
  {
    title: "Duración por Dificultad",
    description: "Duración de los ejercicios por nivel de dificultad",
    image: chart1,
  },
  {
    title: "Cantidad usuarios por género",
    description: "Distribución de usuarios por género",
    image: chart2,
  },
  {
    title: "Duracion Promedio",
    description: "Duracion Promedio de ejercicios por rutinas",
    image: chart3,
  },
  {
    title: "Muscle Groups",
    description: "Training focus by muscle group",
    image: chart4,
  },
];

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-6 space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Statistics Dashboard
          </h1>

          <p className="text-muted-foreground mt-2">
            Analytics and performance insights.
          </p>
        </div>

        <div className="columns-1 lg:columns-2 gap-6 space-y-6">
          {charts.map((chart) => (
            <Card
              key={chart.title}
              className="
                overflow-hidden
                border-border/50
                backdrop-blur-sm
                shadow-lg
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
              "
            >
              <CardHeader>
                <CardTitle>{chart.title}</CardTitle>
                <CardDescription>{chart.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="p-4">
                  <Image
                    src={chart.image}
                    alt={chart.title}
                    width={chart.image.width}
                    height={chart.image.height}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

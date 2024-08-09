import TareaLista from "@/components/TareaLista";
import TareaTarjeta from "@/components/TareaTarjeta";
import { Button } from "@/components/ui/button";
import { getEtiquetas } from "@/lib/actions.etiqueta";
import { getTareas } from "@/lib/actions.tarea";
import Link from "next/link";

export default async function Home() {


  const tareas = await getTareas() as TareaInterface[];
  const etiquetas = await getEtiquetas() as EtiquetaInterface[];

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[url('/assets/images/grid.png')] ">
      
      <div className="flex flex-col gap-4 items-center max-w-screen-sm mb-16">
        <h1 className="text-4xl font-semibold text-gray-900 drop-shadow-xl">
          OrganizaYa
        </h1>

        <p className="text-gray-600 text-center">
          Descubre una nueva forma de gestionar tus tareas diarias con nuestra aplicación intuitiva y eficiente.
        </p>
      </div>


    <TareaLista
      tareas={tareas}
      etiquetas={etiquetas}
    />


    </main>
  );
}

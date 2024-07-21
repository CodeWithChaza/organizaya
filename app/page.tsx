import TareaTarjeta from "@/components/TareaTarjeta";
import { Button } from "@/components/ui/button";
import { getTareas } from "@/lib/actions.tarea";
import Link from "next/link";

export default async function Home() {


  const tareas = await getTareas() as TareaInterface[];

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

      <div className="flex justify-end w-full mb-6">
      <Link href='/tareas/crear'>
        <Button 
            variant="default"
            >
            Crear Tarea
        </Button>
      </Link>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[1024px] place-items-center ">
        {tareas.map((tarea, index) => (
          <TareaTarjeta
            key={index}
            _id={tarea?._id}
            titulo={tarea.titulo}
            desc={tarea.descripcion}
            date={tarea.fechaACompletar as string}
            isCompleted={tarea.isCompleted}
          />

        ))}

      </section>


    </main>
  );
}

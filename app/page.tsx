import TareaTarjeta from "@/components/TareaTarjeta";
import { tareas } from "@/contants";

export default function Home() {

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

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[1024px]">
        {tareas.map((tarea, index) => (
          <TareaTarjeta
            key={index}
            titulo={tarea.titulo}
            desc={tarea.desc}
            date={tarea.date}
            isCompleted={tarea.isCompleted}
          />

        ))}

      </section>


    </main>
  );
}

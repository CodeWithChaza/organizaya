'use client';
import React, { useEffect, useState } from 'react'
import TareaTarjeta from './TareaTarjeta';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Etiqueta from '@/models/etiqueta';


type Props = {
    tareas: TareaInterface[];
    etiquetas: EtiquetaInterface[]
}

const TareaLista = ({tareas, etiquetas} : Props) => {

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [tareasList, setTareasList] = useState(tareas);

    useEffect(() => {
      
        const filteredTareas = tareas.filter((tarea) => 
            tarea.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (tarea.descripcion?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            (tarea.fechaACompletar?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
            etiquetas.some((etiqueta) => 
                etiqueta._id === tarea.etiquetaId && etiqueta.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        setTareasList(filteredTareas);

    }, [tareas, searchQuery, etiquetas])
    


    function handleClick() {
        router.push('/tareas/crear')
    }

  return (
    <div className='flex flex-col w-full gap-6 max-w-[1024px]'>
        
        <div className="flex justify-between w-full">
        <input 
            type="text" 
            placeholder='Buscar...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full max-w-[348px] p-2 border rounded-full shadow'
            />

        <Button 
            variant="default"
            className="bg-blue-700"
            onClick={handleClick}
            >
            Crear Tarea
        </Button>
     
      </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[1024px] place-items-center ">
        {tareasList.map((tarea, index) => (
          <TareaTarjeta
            key={index}
            tarea={tarea}
            etiquetas={etiquetas}
            
          />

        ))}

      </section>
    </div>
  )
}

export default TareaLista
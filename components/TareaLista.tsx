'use client'
import React, { useEffect, useState } from 'react'
import TareaTarjeta from './TareaTarjeta';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

type Props = {
    tareas: TareaInterface[];
    etiquetas: EtiquetaInterface[];
}

const TareaLista = ({tareas, etiquetas} : Props) => {

    const router = useRouter()
    const [ tareasList, setTareasList] = useState(tareas);
    const [ searchQuery, setSearchQuery ] = useState('');


  useEffect(() => {
    const filteredTareas = tareas.filter((tarea) =>
      tarea.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tarea.descripcion?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (tarea.fechaACompletar?.toString().toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      etiquetas.some((etiqueta) => 
        etiqueta._id === tarea.etiquetaId && etiqueta.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setTareasList(filteredTareas);
  }, [searchQuery, tareas, etiquetas]);
  

  function handleClick() {
    router.push('/tareas/crear')
  }
  return (
    <div className='flex flex-col w-full gap-6 max-w-[1024px]'>
        <div className='flex justify-between w-full'>
        <input
            type="text"
            placeholder='Buscar...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full max-w-[348px] p-2 border rounded-full shadow'
        />

        <Button 
            variant="default"
            onClick={handleClick}
            className='bg-blue-700'
            >
            Crear Tarea
        </Button>

        </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[1024px]">
        {tareasList.map((tarea, index) => (
          <TareaTarjeta
            key={index}
            tarea={tarea}
            etiquetas={etiquetas}
          />
        ))}
      </div>




    </div>
  )
}

export default TareaLista
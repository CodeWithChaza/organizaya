'use client'
import React, { useEffect, useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
import { CheckIcon, CircleCheckBig, CircleIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { borrarTarea, completarTarea } from '@/lib/actions.tarea'



  type Props = {
    tarea: TareaInterface;
    etiquetas: EtiquetaInterface[];
  }


const TareaTarjeta = ({tarea, etiquetas} : Props)  => {

    const router  = useRouter(); 
    const [completed, setCompleted] = useState(tarea.isCompleted);
    const [etiqueta, setEtiqueta] = useState<string>();

    const handleComplete = async() => {
        if (tarea._id) {
            const tareaActualizada = await completarTarea(tarea._id);
            setCompleted( (prevState) => !prevState );
        }
    }


    function handleEdit() {
        router.push(`/tareas/editar/${tarea._id}`)
    };

    async function handleDelete() {
        if (tarea._id) {
           const tareaBorrada = await borrarTarea(tarea._id);
        }
    };


    useEffect(() => {
        const etiquetaSeleccionada = etiquetas.find((etiqueta) => etiqueta._id === tarea.etiquetaId);
        if (etiquetaSeleccionada) {
          setEtiqueta(etiquetaSeleccionada.nombre);
        }
      }, [etiquetas, tarea]);
    

  return (
    <Card className='w-[320px]'>
        <CardHeader>

            <CardTitle className='text-xl text-gray-800'>
                {tarea.titulo}
                <Separator className='mt-2'/>
            </CardTitle>

        </CardHeader>

        <CardContent>
            <p className='text-sm text-gray-600'>
                {tarea.descripcion}
            </p>
        </CardContent>

        <CardFooter className='flex flex-col pb-0'>
            <Separator className='mb-4'/>

            <div className='flex justify-start w-full '>
                <p className='text-sm bg-gray-200 text-gray-800 rounded-full py px-4'>
                    {etiqueta}
                </p>
            </div>

            <div className='flex justify-between items-center w-full'>
                <p className='text-sm text-gray-600'>{tarea.fechaACompletar.toString().substring(0,10)}</p>

                <div className='flex justify-end gap-6 w-full my-2 py-2'>
                    <Trash2Icon  
                        className='text-gray-400 hover:text-red-600 cursor-pointer'
                        size={18}
                        onClick={handleDelete}
                        />

                    <PencilIcon 
                        className='text-gray-400 hover:text-blue-600 cursor-pointer'
                        size={18}
                        onClick={handleEdit}/>

                    {completed ? (
                    <CircleCheckBig className='text-green-700'/>
                ) : (
                    <CircleIcon  
                        className='text-gray-300 hover:text-green-700 cursor-pointer'
                        onClick={handleComplete}
                    />
                )}
                </div>
            </div>
        </CardFooter>
    </Card>

  )
}

export default TareaTarjeta
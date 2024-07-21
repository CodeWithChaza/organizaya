'use client'
import React, { useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
import { CheckIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import { borrarTarea, completarTarea } from '@/lib/actions.tarea'



  type Props = {
    _id?: string ;
    titulo: string;
    desc: string;
    date: string;
    isCompleted: Boolean;
  }


const TareaTarjeta = ({_id, titulo, desc, date, isCompleted} : Props)  => {

    const [completed, setCompleted] = useState(isCompleted);
    const router  = useRouter();

    const handleComplete = async() => {


        if (_id) {
            const tareaActualizada = await completarTarea(_id);
            setCompleted( (prevState) => !prevState );
        }
    }


    function handleEdit() {
        router.push(`/tareas/editar/${_id}`)
    };

    async function handleDelete() {
        if (_id) {
           const tareaBorrada = await borrarTarea(_id);
        }

    };



  return (
    <Card className='w-[320px]'>
        <CardHeader>

            <CardTitle className='text-xl text-gray-800'>
                {titulo}
                <Separator className='mt-2'/>
            </CardTitle>

        </CardHeader>

        <CardContent>
            <p className='text-sm text-gray-600'>
                {desc}
            </p>
        </CardContent>

        <CardFooter className='flex flex-col '>
            <Separator className='mb-4'/>
            <div className='flex justify-between items-center w-full'>
                <p className='text-sm text-gray-600'>{date.substring(0,10)}</p>
                {completed ? (
                    <CheckIcon className='text-green-700'/>
                ) : (
                    <Button 
                        variant="outline"
                        onClick={handleComplete}
                        >
                            Completar
                    </Button>
                )}

            </div>
            
            <div className='flex justify-end gap-8 w-full my-2 py-2'>

                <PencilIcon 
                    className='text-gray-400 hover:text-blue-600 cursor-pointer'
                    onClick={handleEdit}/>
                
                <Trash2Icon  
                    className='text-gray-400 hover:text-red-600 cursor-pointer'
                    onClick={handleDelete}
                    />
            </div>
        </CardFooter>
    </Card>

  )
}

export default TareaTarjeta
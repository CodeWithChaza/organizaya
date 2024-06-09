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
import { CheckIcon } from 'lucide-react'
import { Separator } from "@/components/ui/separator"



  type Props = {
    titulo: string;
    desc: string;
    date: Date;
    isCompleted: Boolean;
  }


const TareaTarjeta = ({titulo, desc, date, isCompleted} : Props)  => {

    const [completed, setCompleted] = useState(isCompleted)

    const handleClick = () => {
        setCompleted( (prevState) => !prevState )
    }

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
                <p className='text-sm text-gray-600'>{date.toDateString()}</p>
                {completed ? (
                    <CheckIcon className='text-green-700'/>
                ) : (
                    <Button 
                        variant="outline"
                        onClick={handleClick}
                        >
                            Completar
                    </Button>
                )}

            </div>

        </CardFooter>
    </Card>

  )
}

export default TareaTarjeta
'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'



import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'



const CrearTareaPage = () => {

    const formSchema = z.object({
        _id: z.string().optional(),
        titulo: z.string().min(2).max(50),
        description: z.string().optional(),
        fechaACompletar: z.date().optional(),
        isCompleted: z.boolean().optional(),
      })

    const valoresIniciales = {
        titulo: '',
        descripcion: '',
        fechaACompletar: new Date(),
        isCompleted: false,
    }

          // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: valoresIniciales 
    })

    const formOptions = {
        resolver: zodResolver(formSchema),
        defaultValues: valoresIniciales 
    }



      // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[url('/assets/images/grid.png')] ">

    <Card className='w-full'>
        <CardHeader>

            <CardTitle className='text-3xl text-gray-800'>
                {/* {titulo} */}
                <span>
                  Nueva Tarea
                </span>
                
                <Separator className='mt-2'/>
            </CardTitle>

        </CardHeader>

        <CardContent>
        <div className='flex flex-col '>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg text-gray-800">
                        Titulo
                    </FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Enviar reporte mensual" 
                            className="text-gray-900 placeholder:text-gray-400" 
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg text-gray-800">
                        Descripcion
                    </FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Enviar reporte mensual" 
                            className="text-gray-900 placeholder:text-gray-400" 
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="fechaACompletar"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg text-gray-800">
                        Fecha A Completar
                    </FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Enviar reporte mensual" 
                            className="text-gray-900 placeholder:text-gray-400" 
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />


            <FormField
                control={form.control}
                name="fechaACompletar"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg text-gray-800">
                        Fecha A Completar
                    </FormLabel>
                    <FormControl>
                        <Input 
                            placeholder="Enviar reporte mensual" 
                            className="text-gray-900 placeholder:text-gray-400" 
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />



        </form>
        </Form>
         
              


        </div>
        </CardContent>

        <CardFooter className='flex flex-col '>
            <Separator className='mb-4'/>
            <div className='flex justify-end w-full'>                
                <Button 
                    variant="default"
                    onClick={()=>{}}
                    className='bg-slate-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition-all duration-1000 ease-linear hover:w-80  hover:shadow'
                    >
                    Crear Tarea
                </Button>
            </div>

        </CardFooter>
    </Card>



    </main>  )
}

export default CrearTareaPage
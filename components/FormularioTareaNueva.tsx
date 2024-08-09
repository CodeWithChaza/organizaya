"use client"
import React, { useEffect, useState } from 'react'
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
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { createTarea, editarTarea } from '@/lib/actions.tarea'
import { useRouter } from 'next/navigation'
import { getEtiquetas } from '@/lib/actions.etiqueta'
import { Textarea } from './ui/textarea'
 



const formSchema = z.object({
    _id:z.string().optional(),
  titulo: z.string().min(2),
  descripcion: z.string(),
  fechaACompletar: z.date(),
  isCompleted: z.boolean(),
  etiquetaId: z.string(),
})



type Props = {
    type: 'crear' | 'editar';
    data?: TareaInterface;
}

const FormularioTareaNueva = ({type, data}: Props) => {


    const router = useRouter();
    const [ etiquetaLista, setEtiquetaLista ] = useState<EtiquetaInterface[]>([]);
    const [procesando, setProcesando ] = useState(false);

    const tareaDefaultValues = {
        titulo: "",
        descripcion: '',
        fechaACompletar: new Date(),
        isCompleted: false,
    }

    const tareaEditarValues = {
        _id: data?._id,
        titulo: data?.titulo,
        descripcion: data?.descripcion,
        fechaACompletar: data?.fechaACompletar ? new Date(data?.fechaACompletar) : new Date(),
        isCompleted: data?.isCompleted,
        etiquetaId: data?.etiquetaId
    }

    const initialValues = data && type === 'editar' ? tareaEditarValues : tareaDefaultValues;

      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        try {
          setProcesando((prevState) => !prevState)

            if ( type === 'crear') {
                const tareaNueva = await createTarea(values);
    
                if (tareaNueva) {
                    router.push('/');
                    form.reset();
                } else {
    
                }

            } 


            if (type === 'editar') {
                const tareaActulizada = await editarTarea(values);
    
                if (tareaActulizada) {
                    router.push('/');
                    form.reset();
                } else {
    
                }
            }

        } catch (error) {
            console.log('Error: ', error);
        } finally {
          setProcesando((prevState) => !prevState)

        }
      }

      
      useEffect(() => {
        const fetchEtiquetas = async () => {
          const etiquetas = await getEtiquetas();
          setEtiquetaLista(etiquetas);
        };
    
        fetchEtiquetas();
      }, []);




  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border rounded-md p-4 space-y-8 shadow-lg">

        <div className='flex flex-col md:flex-row gap-12'>

        <div className='flex flex-col gap-8 min-w-72'>

        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input placeholder="Hacer las compras" {...field} />
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
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea  placeholder="" className='h-44' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>


        <div className='flex flex-col gap-8 min-w-72'>

        <FormField
          control={form.control}
          name="fechaACompletar"
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2'>
              <FormLabel>Fecha a Completar</FormLabel>
              <FormControl>

              <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="etiquetaId"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Etiqueta</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full max-w-[264px]">
                        <SelectValue placeholder="Selecciona Etiqueta" className='text-white'/>
                    </SelectTrigger>
                    <SelectContent className='max-h-72 overflow-y-auto'>
                      <SelectGroup>

                        <SelectLabel>Etiquetas</SelectLabel>
                        {etiquetaLista?.map((etiqueta) => (
                            <SelectItem 
                                key={etiqueta._id}
                                value={etiqueta._id!}
                                >
                                <span className='capitalize'>
                                    {etiqueta.nombre}
                                </span>
                            </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isCompleted"
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel>Tarea Completada?</FormLabel>
              <FormControl>
                <Checkbox 
                checked={field.value}
                onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        </div>


        <Button 
          type="submit"
          disabled={procesando}
          className='w-full bg-blue-800'
          >
            {type === 'editar' ? 'Guardar' : 'Crear'}
          </Button>
      </form>
    </Form>
  )
}

export default FormularioTareaNueva
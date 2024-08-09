
"use client"
import React, { useState } from 'react'
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

import { useRouter } from 'next/navigation'
import { crearEtiqueta, editarEtiqueta } from '@/lib/actions.etiqueta'
 

const formSchema = z.object({
    _id: z.string().optional(),
    nombre: z.string().min(2),
})



type Props = {
    type: 'crear' | 'editar';
    data?: EtiquetaInterface;
}

const FormularioEtiqueta = ({type, data}: Props) => {


    const router = useRouter();
    const [procesando, setProcesando] = useState(false);

    const etiquetaDefaultValues = {
        nombre: "",
    }

    const etiquetaEditarValues = {
        _id: data?._id,
        nombre: data?.nombre,
    }


    const initialValues = data && type === 'editar' ? etiquetaEditarValues : etiquetaDefaultValues;

      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)   

        try {
            setProcesando((prevState) => !prevState);

            if ( type === 'crear') {
                const etiquetaNueva = await crearEtiqueta(values);
    
                if (etiquetaNueva) {
                    // router.push('/');
                    form.reset();
                } else {
    
                }
            } 

            if (type === 'editar') {
                const etiquetaActulizada = await editarEtiqueta(values);
    
                if (etiquetaActulizada) {
                    // router.push('/');
                    form.reset();
                } else {
    
                }
            }

        } catch (error) {
            console.log('Error: ', error);
        } finally {
            setProcesando((prevState) => !prevState);
        }
      }


  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white border rounded-md p-4 space-y-8 w-full">
        <FormField
          control={form.control}
          name="nombre"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de Etiqueta</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
            type="submit" 
            disabled={procesando}
            className='bg-blue-700'
            >
                Submit
        </Button>
      </form>
    </Form>
  )
}

export default FormularioEtiqueta
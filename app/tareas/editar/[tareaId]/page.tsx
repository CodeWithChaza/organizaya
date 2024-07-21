import FormularioTareaNueva from '@/components/FormularioTareaNueva';
import { getTareasById } from '@/lib/actions.tarea';
import React from 'react'

const page = async ({ params }: { params: { tareaId: string } }) => {

    // async function handleCrear(){
    //     const tarea = await CreateTarea();

    // } 

    // async function handleEditar(){
    //     const tarea = await EditarTarea();
    //     console.log('Tarea Editada: ', tarea)
    // }  

    // async function handleBorrar(){
    //     const tarea = await BorrarTarea();
    // }  


    const tarea = await getTareasById(params.tareaId)

  return (

<main className="flex min-h-screen flex-col items-center p-24 bg-[url('/assets/images/grid.png')] ">
    <h1>Editar Tarea</h1>
    
    <FormularioTareaNueva
        type='editar'
        data={tarea}
    />


</main>  

)
}

export default page
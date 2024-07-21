import FormularioTareaNueva from '@/components/FormularioTareaNueva';
import React from 'react'

const page = () => {

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

  return (
<main className="flex min-h-screen flex-col items-center p-24 bg-[url('/assets/images/grid.png')] ">
    <FormularioTareaNueva
      type='crear'
    />

</main>  

)
}

export default page
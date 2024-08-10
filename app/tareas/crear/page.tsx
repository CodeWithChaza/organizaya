import FormularioTareaNueva from '@/components/FormularioTareaNueva';
import { getEtiquetas } from '@/lib/actions.etiqueta';
import React from 'react'

const page = async() => {


  return (
<main className="flex min-h-screen flex-col items-center p-24 bg-[url('/assets/images/grid.png')] ">
    <FormularioTareaNueva
      type='crear'

    />

</main>  

)
}

export default page
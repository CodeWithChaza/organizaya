'use client'
import { borrarEtiqueta } from '@/lib/actions.etiqueta'
import { XIcon } from 'lucide-react'
import React from 'react'

type Props = {
    etiqueta: EtiquetaInterface
}

const EtiquetaTarjeta = ({etiqueta}: Props) => {

    async function handleDelete() {
        await borrarEtiqueta(etiqueta._id!)
    }


  return (
    <div 
        className='flex justify-between items-center gap-6 min-w-28 bg-white border text-center p-3 rounded-full shadow '
        >
        <span className='text-gray-800'>
            {etiqueta.nombre}
        </span>

        <XIcon 
            size={18}
            className=' text-gray-400 cursor-pointer hover:text-red-600'
            onClick={handleDelete}
            />
    </div>
  )
}

export default EtiquetaTarjeta
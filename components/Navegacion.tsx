'use client';

import { linkNavegacion } from '@/contants'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navegacion = () => {

    const pathName = usePathname();
  return (
    <nav className='flex w-full justify-center item-center'>
        <div className='flex  px-8 py-2 mt-4 border rounded-lg shadow'>
            <ul className='flex justify-between gap-4'>
                {linkNavegacion.map((link => {
                    const isActive = link.route === pathName || pathName.includes(`${link.route}/`)
                    return(
                        <li 
                            key={link.route}
                            className={`text-lg font-semibold rounded-md hover:bg-blue-100
                                ${isActive 
                                    ? 'bg-blue-800 text-white' 
                                    : ''}
                            `}>
                                <Link 
                                    href={link.route}
                                    className='flex w-full px-2 cursor-pointer'
                                    >
                                    {link.titulo}
                                </Link>
                        </li>
                    )
                }))}
          
            </ul>
        </div>
    </nav>
  )
}

export default Navegacion
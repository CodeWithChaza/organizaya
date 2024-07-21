'use server'

import Tarea from "@/models/tareas"
import { connectToDatabase } from "@/utils/database"
import { revalidatePath } from 'next/cache'


export const createTarea = async(tareaNueva: tareaNueva) => {

    await connectToDatabase();

    try {
        const tarea =  new Tarea(tareaNueva);
        const tareaCreada = await tarea.save();

        revalidatePath('/');

        return JSON.parse(JSON.stringify(tareaCreada)) 
        
    } catch (error) {
        console.log('Error: ', error)
    }



}


export const editarTarea = async(tarea: TareaInterface) => {
    await connectToDatabase();

    try {
        const tareaAEditar = await Tarea.findById(tarea._id) as TareaInterface;
        if (!tareaAEditar) return;


        const tareaActulizada = await Tarea.findByIdAndUpdate( tareaAEditar._id, tarea, {new: true});
        revalidatePath('/');


        return JSON.parse(JSON.stringify(tareaActulizada)) 
        
    } catch (error) {
        
    }
}

export const completarTarea = async(tareaId: string) => {
    await connectToDatabase();

    try {
        const tareaAEditar = await Tarea.findById(tareaId) as TareaInterface;
        if (!tareaAEditar) return;


        const tareaActulizada = await Tarea.findByIdAndUpdate( 
            tareaAEditar._id, 
            {
                isCompleted: true,
            }, 
            {new: true});
        revalidatePath('/');


        return JSON.parse(JSON.stringify(tareaActulizada)) 
        
    } catch (error) {
        
    }
}


export const borrarTarea = async(tareaId: string) => {

    await connectToDatabase();

    try {

        const tareaBorrada = await Tarea.findByIdAndDelete(tareaId);
        revalidatePath('/');

        return JSON.parse(JSON.stringify(tareaBorrada)); 
    } catch (error) {
        
    }
}


export const getTareas = async () => {
    await connectToDatabase();

    try {
        
        const tareas = await Tarea.find();

        return JSON.parse(JSON.stringify(tareas)) 

    } catch (error) {
        console.log('Error: ', error)
    }
}


export const getTareasById = async (tareaId: string) => {
    await connectToDatabase();

    try {
        
        const tarea = await Tarea.findById(tareaId);

        return JSON.parse(JSON.stringify(tarea)) 

    } catch (error) {
        console.log('Error: ', error)
    }
}
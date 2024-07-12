'use server'

import Tarea from "@/models/tareas"
import { connectToDatabase } from "@/utils/database"

export const CreateTarea = async() => {

    const tareaNueva = {
        titulo: "Comprar comestibles",
        desc: "Compra alimentos para la semana: leche, huevos, pan, frutas y verduras.",
        isCompleted: false
    }

    await connectToDatabase();

    try {
        const tarea =  new Tarea(tareaNueva);
        const tareaCreada = await tarea.save();

        return tareaCreada
        
    } catch (error) {
        console.log('Error: ', error)
    }



}
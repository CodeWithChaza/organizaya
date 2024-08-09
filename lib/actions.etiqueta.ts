'use server'

import Etiqueta from "@/models/etiqueta";
import { connectToDatabase } from "@/utils/database";
import { revalidatePath } from "next/cache";


export const createEtiqueta = async(etiquetaNueva: EtiquetaParams) => {

    await connectToDatabase();

    try {
        const etiqueta =  new Etiqueta(etiquetaNueva);
        const etiquetaCreada = await etiqueta.save();

        revalidatePath ('/etiquetas');

        return JSON.parse(JSON.stringify(etiquetaCreada)) 
        
    } catch (error) {
        console.log('Error: ', error)
    }
}



export const editarEtiqueta = async(etiqueta: EtiquetaInterface) => {
    await connectToDatabase();

    try {
        const etiquetaAEditar = await Etiqueta.findById(etiqueta._id) as EtiquetaInterface;
        if (!etiquetaAEditar) return;


        const etiquetaActulizada = await Etiqueta.findByIdAndUpdate( etiquetaAEditar._id, etiqueta, {new: true});
        revalidatePath ('/etiquetas');

        return JSON.parse(JSON.stringify(etiquetaActulizada)) 
        
    } catch (error) {
        
    }
}



export const borrarEtiqueta = async(etiquetaId: string) => {

    await connectToDatabase();

    try {

        const etiquetaBorrada = await Etiqueta.findByIdAndDelete(etiquetaId);
        revalidatePath('/etiquetas');

        return JSON.parse(JSON.stringify(etiquetaBorrada)); 
    } catch (error) {
        
    }
}


export const getEtiquetas = async() => {
    await connectToDatabase();

    try {

        const etiquetas = await Etiqueta.find();
        return JSON.parse(JSON.stringify(etiquetas)) 
        
    } catch (error) {
        console.log(error);
    }
}
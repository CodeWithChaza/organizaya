

// TAREAS  
declare type tareaNueva = {
    titulo: string;
    descripcion: string;
    fechaACompletar: Date;
    isCompleted: boolean;
}

declare type TareaInterface = {
    _id?: string;
    titulo: string;
    descripcion: string;
    fechaACompletar: string | Date ;
    isCompleted: boolean;
}
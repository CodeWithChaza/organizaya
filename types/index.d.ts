

// TAREAS  
declare type tareaNueva = {
    titulo: string;
    descripcion: string;
    fechaACompletar: Date;
    isCompleted: boolean;
    etiquetaId: string;
}

declare type TareaInterface = {
    _id?: string;
    titulo: string;
    descripcion: string;
    fechaACompletar: string | Date ;
    isCompleted: boolean;
    etiquetaId: string;
}


declare type EtiquetaInterface = {
    _id?: string;
    nombre: string;
}

declare type EtiquetaParams = {
    nombre: string;
}
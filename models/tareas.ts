import {Schema, model, models} from 'mongoose';

const TareaSchema = new Schema({
    titulo: {
        type: String,
        require: true,
    },
    descripcion: {
        type: String,
    },
    fechaACompletar:{
        type: Date,
        default: new Date()
    },
    isCompleted: {
        type: Boolean,
    }, 

});

const Tarea = models.Tarea || model('Tarea', TareaSchema)

export default Tarea
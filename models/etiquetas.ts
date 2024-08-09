import {Schema, model, models} from 'mongoose';

const EtiquetaSchema = new Schema({
    nombre: {
        type: String,
        require: true,
    },
});

const Etiqueta = models?.Etiqueta || model('Etiqueta', EtiquetaSchema)

export default Etiqueta
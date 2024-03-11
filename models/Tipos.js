const {Schema, model} = require('mongoose')

const TiposSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion requerida']
    },
})

module.exports = model('Tipos', TiposSchema)
const {Schema, model} = require('mongoose')

const GeneroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido'],
        unique: [true, 'Genero Existente']
    },
    estado: {
        type: String,
        default: true,
        required: true,
        enum: ['Activo','Inactivo']
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
    }
})

module.exports = model('Genero', GeneroSchema)
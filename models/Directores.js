const {Schema, model} = require('mongoose')

const DirectoresSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
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
    }
})

module.exports = model('Directores', DirectoresSchema)
const {Schema, model} = require('mongoose')

const ProductoraSchema = Schema({
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
    },
    slogan: {
        type: String,
        required: [true, 'Slogan']
    },
    descripcion: {
        type: String,
        required: [true, 'Descripcion requerida']
    }
})

module.exports = model('Productora', ProductoraSchema)
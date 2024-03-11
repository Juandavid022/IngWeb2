const {Schema, model} = require('mongoose')

const MediaSchema = Schema({
    serial: {
        type: String,
        required: [true, 'Serial requerido'],
        unique: true
    },
    titulo: {
        type: String,
        required: [true, 'Titulo requerido']
    },
    sinopsis: {
        type: String,
        required: [true, 'Sinopsis requerido']
    },
    urlPelicula: {
        type: String,
        required: true,
        unique: true
    },

    imagen: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    },
    anioEstreno: {
        type: String,
        required: true,
        unique: true
    },
    generoPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: false
    },
    directorPrincipal: {
        type: Schema.Types.ObjectId,
        ref: 'Directores',
        required: false
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: false
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipos',
        required: false
    }
})

module.exports = model('Media', MediaSchema)

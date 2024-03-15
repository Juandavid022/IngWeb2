const { Router } = require('express')

const Genero = require('../models/Genero');

const {validationResult,check} = require('express-validator');
const { Db } = require('mongodb');
const { default: mongoose } = require('mongoose');

const router = Router();

// POST
router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    

], async function (req, res){

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array() });
        }

        const existeGeneros = await Genero.findOne({nombre: req.body.nombre.toUpperCase() }); 
        if (existeGeneros){
            return res
                .status(400)
                .json({ message: "El Genero ya ha sido registrado" });
        }     
        
        let genero = new Genero();
        genero.nombre = req.body.nombre.toUpperCase();
        genero.estado = req.body.estado;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;
        genero.descripcion = req.body.descripcion;

        genero = await genero.save();
        res.send(genero);
        console.log(genero);


}catch(error){
    console.log(error);

}})

//Get
router.get('/', async function (req, res) { 
try {
    const usuarios = await Genero.find();
    res.send(usuarios);
    
} catch (error) {
    console.log(error)
    res.status(500).send('Ocurrio un error')
}

  });



// DELETE
    router.delete("/:_id", async (req, res) => {
 
    try {
        const { _id } = req.params;
        await Genero.deleteOne({ _id: _id })
        res.send({ message: 'Deleted' });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Ocurrio un error' })
    }

});



// PUT
router.put('/:_generoid', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    

], async function (req, res){

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array() });
        }


        let genero = await Genero.findById(req.params._generoid);
        if(!genero){
            return res.status(400).send('no existe');
        }

        const existeGenero = await Genero.findOne({ nombre:req.body.nombre,_id: {$ne:genero._id} }); 
        if (existeGenero){
            return res
                .status(400)
                .json({ message: "El Genero ya ha sido registrado" });
        }    
        
        genero.nombre = req.body.nombre.toUpperCase();
        genero.estado = req.body.estado;
        genero.fechaActualizacion = new Date;
        genero.descripcion = req.body.descripcion;

        genero = await genero.save();
        res.send(genero);
        console.log(genero);


}catch(error){
    res.status(500).send('Ocurrio un error al actualizar usuario')
    console.log(error);

}})

module.exports = router;
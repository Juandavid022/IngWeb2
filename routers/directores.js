const { Router } = require('express')

const Director = require('../models/Directores');

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

        const existeDirector = await Director.findOne({nombre: req.body.nombre.toUpperCase() }); 
        if (existeDirector){
            return res
                .status(400)
                .json({ message: "El Director ya ha sido registrado" });
        }     
        
        let directores = new Directores();
        directores.nombre = req.body.nombre.toUpperCase();
        directores.estado = req.body.estado;
        directores.fechaCreacion = new Date;
        directores.fechaActualizacion = new Date;

        directores = await directores.save();
        res.send(directores);
        console.log(directores);


}catch(error){
    console.log(error);

}})

//Get
router.get('/', async function (req, res) { 
try {
    const usuarios = await Director.find();
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
        await Director.deleteOne({ _id: _id })
        res.send({ message: 'Deleted' });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Ocurrio un error' })
    }

});



// PUT
router.put('/:_id', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    

], async function (req, res){

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array() });
        }


        let directores = await Director.findById(req.params._id);
        if(!directores){
            return res.status(400).send('no existe');
        }

        const existeDirector = await Director.findOne({ nombre:req.body.nombre,_id: {$ne:Director._id} }); 
        if (existeDirector){
            return res
                .status(400)
                .json({ message: "El Genero ya ha sido registrado" });
        }    
        
        directores.nombre = req.body.nombre.toUpperCase();
        directores.estado = req.body.estado;
        directores.fechaActualizacion = new Date;

        directores = await directores.save();
        res.send(directores);
        console.log(directores);


}catch(error){
    res.status(500).send('Ocurrio un error al actualizar usuario')
    console.log(error);

}})

module.exports = router;
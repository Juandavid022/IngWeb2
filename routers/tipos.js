const { Router } = require('express')

const Productora = require('../models/Tipos');
const {validationResult,check} = require('express-validator');
const { Db } = require('mongodb');
const { default: mongoose } = require('mongoose');
const Tipos = require('../models/Tipos');

const router = Router();

// POST
router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    

], async function (req, res){

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array() });
        }

        const existeTipos = await Tipos.findOne({nombre: req.body.nombre.toUpperCase() }); 
        if (existeTipos){
            return res
                .status(400)
                .json({ message: "El tipo ya ha sido registrado" });
        }     

        let tipos = new Tipos();
        tipos.nombre = req.body.nombre.toUpperCase();
        tipos.fechaCreacion = new Date;
        tipos.fechaActualizacion = new Date;
        tipos.descripcion = req.body.descripcion;

        tipos = await tipos.save();
        res.send(tipos);
        console.log(tipos);


}catch(error){
    console.log(error);

}})

//Get
router.get('/', async function (req, res) { 
try {
    const tipos = await Tipos.find();
    res.send(tipos);
    
} catch (error) {
    console.log(error)
    res.status(500).send('Ocurrio un error')
}

  });



// DELETE
    router.delete("/:_id", async (req, res) => {
 
    try {
        const { _id } = req.params;
        await Tipos.deleteOne({ _id: _id })
        res.send({ message: 'Tipo eliminado' });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Ocurrio un error' })
    }

});



// PUT
router.put('/:_id', [
    check('nombre','invalid.nombre').not().isEmpty()
    

], async function (req, res){

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array() });
        }


        let tipos = await Tipos.findById(req.params._id);
        if(!tipos){
            return res.status(400).send('no existe');
        }

        const existeTipos = await Tipos.findOne({ nombre:req.body.nombre,_id: {$ne:Productora._id} }); 
        if (existeTipos){
            return res
                .status(400)
                .json({ message: "El tipo ya ha sido registrado" });
        }    
        

        tipos.nombre = req.body.nombre.toUpperCase();
        tipos.fechaActualizacion = new Date;
        tipos.descripcion = req.body.descripcion;

        tipos = await tipos.save();
        res.send(tipos);
        console.log(tipos);


}catch(error){
    res.status(500).send('Ocurrio un error al actualizar usuario')
    console.log(error);

}})

module.exports = router;
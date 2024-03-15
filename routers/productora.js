const { Router } = require('express')

const Productora = require('../models/Productora');

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

        const existeProductora = await Productora.findOne({nombre: req.body.nombre.toUpperCase() }); 
        if (existeProductora){
            return res
                .status(400)
                .json({ message: "La Productora ya ha sido registrada" });
        }     
        
        let productoras = new Productora();
        productoras.nombre = req.body.nombre.toUpperCase();
        productoras.estado = req.body.estado;
        productoras.fechaCreacion = new Date;
        productoras.fechaActualizacion = new Date;
        productoras.slogan = req.body.slogan;
        productoras.descripcion = req.body.descripcion;

        productoras = await productoras.save();
        res.send(productoras);
        console.log(productoras);


}catch(error){
    console.log(error);

}})

//Get
router.get('/', async function (req, res) { 
try {
    const productoras = await Productora.find();
    res.send(productoras);
    
} catch (error) {
    console.log(error)
    res.status(500).send('Ocurrio un error')
}

  });



// DELETE
    router.delete("/:_id", async (req, res) => {
 
    try {
        const { _id } = req.params;
        await Productora.deleteOne({ _id: _id })
        res.send({ message: 'Productora eliminada' });

        
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


        let productoras = await Productora.findById(req.params._id);
        if(!productoras){
            return res.status(400).send('no existe');
        }

        const existeProductora = await Productora.findOne({ nombre:req.body.nombre,_id: {$ne:Productora._id} }); 
        if (existeProductora){
            return res
                .status(400)
                .json({ message: "la Productora ya ha sido registrada" });
        }    
        

        productoras.nombre = req.body.nombre.toUpperCase();
        productoras.estado = req.body.estado;
        productoras.fechaActualizacion = new Date;
        productoras.slogan = req.body.slogan;
        productoras.descripcion = req.body.descripcion;

        productoras = await productoras.save();
        res.send(productoras);
        console.log(productoras);


}catch(error){
    res.status(500).send('Ocurrio un error al actualizar usuario')
    console.log(error);

}})

module.exports = router;
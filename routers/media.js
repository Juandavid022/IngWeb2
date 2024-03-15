const { Router } = require('express')

const Media = require('../models/Media');

const {validationResult,check} = require('express-validator');
const { Db } = require('mongodb');
const { default: mongoose } = require('mongoose');

const router = Router();

// POST
router.post('/', [
    check('titulo','invalid.nombre').not().isEmpty(),

    

], async function (req, res){

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array() });
        }

        const existeMedia = await Media.findOne({titulo: req.body.titulo.toUpperCase() }); 
        if (existeMedia){
            return res
                .status(400)
                .json({ message: "Media ya ha sido registrada" });
        }     
        
        let medias = new Media();
        medias.serial = req.body.serial;
        medias.titulo = req.body.titulo.toUpperCase();
        medias.sinopsis = req.body.sinopsis;
        medias.urlPelicula = req.body.urlPelicula;
        medias.imagen = req.body.imagen;
        medias.fechaCreacion = new Date;
        medias.fechaActualizacion = new Date;
        medias.anioEstreno = req.body.anioEstreno;
        medias.generoPrincipal = req.body.generoPrincipal._id;
        medias.directorPrincipal = req.body.directorPrincipal._id;
        medias.productora = req.body.productora._id;
        medias.tipo = req.body.tipo._id;

        medias = await medias.save();
        res.send(medias);
        console.log(medias);


}catch(error){
    console.log(error);

}})

//Get
router.get('/', async function (req, res) { 
try {
    const medias = await Media.find().populate([
        {
            path:'generoPrincipal',select:'nombre'
        },
        {
            path:'directorPrincipal',select:'nombre'
        },
        {
            path:'productora',select:'nombre'
        },
        {
            path:'tipo',select:'nombre'
        }
    ]);
    
    res.send(medias);
    
} catch (error) {
    console.log(error)
    res.status(500).send('Ocurrio un error')
}

  });



// DELETE
    router.delete("/:_id", async (req, res) => {
 
    try {
        const { _id } = req.params;
        await Media.deleteOne({ _id: _id })
        res.send({ message: 'Media eliminada' });

        
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Ocurrio un error' })
    }

});



// PUT
router.put('/:_id', [
    check('titulo','invalid.titulo').not().isEmpty(),

    

], async function (req, res){

    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({msg: errors.array() });
        }


        let medias = await Media.findById(req.params._id);
        if(!medias){
            return res.status(400).send('no existe');
        }

        const existeMedia = await Media.findOne({ titulo:req.body.titulo,_id: {$ne:Media._id} }); 
        if (existeMedia){
            return res
                .status(400)
                .json({ message: "Media ya ha sido registrada" });
        }    
        

        medias.serial = req.body.serial;
        medias.titulo = req.body.titulo.toUpperCase();
        medias.sinopsis = req.body.sinopsis;
        medias.urlPelicula = req.body.urlPelicula;
        medias.imagen = req.body.imagen;
        medias.fechaActualizacion = new Date;
        medias.anioEstreno = req.body.anioEstreno;
        medias.generoPrincipal = req.body.generoPrincipal._id;
        medias.directorPrincipal = req.body.directorPrincipal._id;
        medias.productora = req.body.productora._id;
        medias.tipo = req.body.tipo._id;

        medias = await medias.save();
        res.send(medias);
        console.log(medias);


}catch(error){
    res.status(500).send('Ocurrio un error al actualizar usuario')
    console.log(error);

}})

module.exports = router;
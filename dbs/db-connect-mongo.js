const mongoose = require('mongoose');

const getConnection = async () => {

    try {
        const url = 'mongodb+srv://jdgr22:juandavid022@cluster0.jlvrt1e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    
        await mongoose.connect(url);

        console.log('Conexion Exitosa');
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getConnection,
}
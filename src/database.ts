import mongoose, { connection } from "mongoose"
import config from './config/config'

mongoose.connect(config.DB.URI);

const conection = mongoose.connection;

conection.once('open',()=>{
    console.log('Conecxion Exitosa con la base de datos');

});

conection.on('error', err =>{
    //console.log(err);
    process.exit(0);
})

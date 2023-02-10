import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Carpeta extends Document {
    owner:string,
    nombre:string,
}

//EL ESQUEMA DE USUARIO
const CarpetaSchema = new Schema ({
    owner:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    nombre:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
});

CarpetaSchema.pre<Carpeta>('save', async function(next){
    next();

})


export default model<Carpeta>('Carpetas', CarpetaSchema);
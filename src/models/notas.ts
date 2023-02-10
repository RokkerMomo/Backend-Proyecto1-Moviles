import { Model, Schema, Document, model } from "mongoose";

//INTERFACE
export interface Notes extends Document {
    owner:string,
    titulo:string,
    descripcion:string,
    fecha:string,
    carpeta:string,
    
}


//EL ESQUEMA DE USUARIO
const NotesSchema = new Schema ({
    owner:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    titulo:{
        type:String,
        unique:false,
        required:true,
        trim:true
    },
    descripcion:{
        type:String,
        unique:false,
        required:false,
        trim:true
    },
    fecha:{
        type:String,
        unique:false,
        required:true,
        trim:true,

    },
    carpeta:{
        type:String,
        unique:false,
        required:false,
        trim:true,
    }
});

NotesSchema.pre<Notes>('save', async function(next){
    next();

})

export default model<Notes>('Notas', NotesSchema);
import { Model, Schema, Document, model } from "mongoose";

export interface IUser extends Document {
    id:number,
    nombre:string,
    rol:string
}

const UserSchema = new Schema ({
    id:{
        type:Number,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    nombre:{
        type:String,
        require:true
    },
    rol:{
        type:String,
        require:true
    },
})

export default model<IUser>('usuario', UserSchema);
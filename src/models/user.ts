import { Model, Schema, Document, model } from "mongoose";
import bcrypt from 'bcrypt'
export interface IUser extends Document {
    email:string,
    password:string,
    comparePassword:(p: object) => Response

    
}

const UserSchema = new Schema ({
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
});

UserSchema.pre<IUser>('save', async function(next){
    const user = this;
    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    next();

})

UserSchema.methods.comparePassword = async function(
    password: string
  ): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
  };


export default model<IUser>('User', UserSchema);
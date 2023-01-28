import { Request, Response } from "express"
import User, {IUser} from "../models/user"
import jwt from 'jsonwebtoken'
import config from "../config/config";

function createToken(user: IUser){
return jwt.sign({id:user.id, email:user.email},config.jwtSecret,{
    expiresIn:86400
});
}

export const signUp = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.email || !req.body.password){
        return res.status(400).json({msg:'Asegurese de ingresar el corre y la contraseña'})
    }
    const user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({msg:'El Correo que ingreso ya existe'});
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
}

export const signIn = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "Asegurese de ingresar el email y la contraseña" });
    }
    console.log(req.body)
    const user = await User.findOne({email:req.body.email});
    console.log(user)
    if (!user) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
  
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      return res.status(400).json({ token: createToken(user) });
    }
  
    return res.status(400).json({
      msg: "The email or password are incorrect"
    });
  };
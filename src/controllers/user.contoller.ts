import { Request, Response } from "express"
import usuarios, {IUser} from "../models/user"
import jwt from 'jsonwebtoken'
import config from "../config/config";
import Notas, { Notes } from "../models/notas";
import bcrypt from 'bcrypt'
//FUNCION PARA CREAR TOKEN
function createToken(user: IUser){
return jwt.sign({id:user.id, usuario:user.usuario},config.jwtSecret,{
    expiresIn:86400
});
}



//REGISTRO
export const signUp = async (req: Request,res: Response): Promise<Response> =>{
    if (!req.body.usuario || !req.body.password){
        return res.status(400).json({msg:'Asegurese de ingresar el usuario y la contraseña'})
    }
    const user = await usuarios.findOne({usuario:req.body.usuario});
    if(user){
        return res.status(400).json({msg:'El Usuario que ingreso ya existe'});
    }
    //GUARDAR USUARIO
    const newUser = new usuarios(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
}

//LOGIN
export const signIn = async (req: Request,res: Response): Promise<Response> => {
    if (!req.body.usuario || !req.body.password) {
      return res.status(400).json({ msg: "Asegurese de ingresar el usuario y la contraseña" });
    }
    const user = await usuarios.findOne({usuario:req.body.usuario});
    if (!user) {

      return res.status(400).json({ msg: "El usuario no existe" });
    }
  
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
     //DEVOLVER RESPUETA
      return res.status(400).json({msg: "El correo o la contraseña son incorrectos"});
    }
     //DEVOLVER TOKEN
    //  user.push({token:createToken(user)})
    
    return res.status(201).json({ user,token: createToken(user) });
    
   
  };



  export const FindUser = async (req: Request,res: Response): Promise<Response> => {
    const user:any = await usuarios.findOne({_id:req.body._id});
    console.log(req.body)
    if (!user) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json(user);
  };

  export const deleteUser = async (req: Request, res: Response): Promise<Response>=>{

    const user = await usuarios.findOne({_id:req.body._id});
    if(!user){
        return res.status(400).json({msg:'el usuario que busco no existe'});
    }

    await usuarios.deleteOne({_id:req.body._id});
    await Notas.deleteMany({owner:req.body._id});
    return res.status(201).json({msg:"Cuenta eliminada con exito"});

}


export const edituser = async (req:Request, res: Response): Promise<Response>=>{
  const user = await usuarios.updateOne({_id:req.body._id},{nombre:req.body.nombre, apellido:req.body.apellido, usuario:req.body.usuario});
  if (!user) {
      return res.status(400).json({msg:"Error al intentar editar perfil"});
  }

  return res.status(201).json({msg:"Guardado con exito"});
}


export const editpassword = async (req:Request, res: Response): Promise<Response>=>{

  if (!req.body.actual || !req.body.nueva) {
    return res.status(400).json({ msg: "Asegurese de ingresar los campos" });
  }

  const user = await usuarios.findOne({_id:req.body._id});
  if (!user) {

    return res.status(400).json({ msg: "El usuario no existe" });
  }

  const isMatch = await user.comparePassword(req.body.actual);
  if (!isMatch) {
   //DEVOLVER RESPUETA
    return res.status(400).json({msg: "La contraseña actual no coincide"});
  }

  if (req.body.actual==req.body.nueva) {
    return res.status(400).json({msg: "la contraseña nueva no puede ser igual que la actual"})
  }
  
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.nueva,salt);

  const pass = await usuarios.updateOne({_id:req.body._id},{password:hash});


  

  return res.status(201).json({msg:"Cambio realizado con exito"});
}
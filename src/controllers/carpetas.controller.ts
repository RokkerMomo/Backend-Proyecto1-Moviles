import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import config from "../config/config";
import carpetas from "../models/carpetas";
import Carpetas, { Carpeta } from "../models/carpetas";
import notas from "../models/notas";
import Notas, { Notes } from "../models/notas";
//Crear coleccion
export const newCarpeta = async (req: Request,res: Response): Promise<Response> =>{

    //Guardar coleccion
    const newcarpet = new Carpetas(req.body);
    await newcarpet.save();
    return res.status(201).json(newcarpet);
}

export const showcolecction = async (req: Request, res:Response): Promise<Response> =>{
    const carpetas = await Carpetas.find({owner:req.body.owner})
    if (!carpetas) {
        return res.status(400).json({msg:"el usuario no existe"})
    }

    return res.status(201).json(carpetas)
}

export const deletecollection = async (req: Request, res: Response): Promise<Response> =>{
    const carpeta = await Carpetas.findOne({nombre:req.body.nombre})
    if (!carpeta) {
        return res.status(400).json({msg:"la carpeta que busco no existe"})
    }
    await notas.updateMany({carpeta:req.body.nombre},{carpeta:" "})
    await carpetas.deleteOne({nombre:req.body.nombre})
    return res.status(200).json({msg:"La carpeta fue borrada con exito"})
}


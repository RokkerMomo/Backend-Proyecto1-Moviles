import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import config from "../config/config";
import Carpetas, { Carpeta } from "../models/carpetas";

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


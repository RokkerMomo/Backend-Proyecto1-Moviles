import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import config from "../config/config";
import Notas, { Notes } from "../models/notas";

//Crear Nota
export const newNote = async (req: Request,res: Response): Promise<Response> =>{

    //GUARDAR Nota
    const newnota = new Notas(req.body);
    await newnota.save();
    return res.status(201).json(newnota);
}

export const showNotes = async (req: Request, res: Response): Promise<Response>=>{
    
    const notas = await Notas.find({});
    console.log(notas);
    return res.status(201).json(notas);

}

export const showDetails = async (req: Request, res: Response): Promise<Response>=>{
    
    const nota = await Notas.findOne({_id:req.body._id});
    if(!nota){
        return res.status(400).json({msg:'La nota que busco no existe'});
    }
    //GUARDAR USUARIO
    return res.status(201).json(nota);

}

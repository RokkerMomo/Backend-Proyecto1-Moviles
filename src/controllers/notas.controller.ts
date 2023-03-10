import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import config from "../config/config";
import Notas, { Notes } from "../models/notas";
import Carpetas, { Carpeta } from "../models/carpetas";
//Crear Nota
export const newNote = async (req: Request,res: Response): Promise<Response> =>{

    //GUARDAR Nota
    const newnota = new Notas(req.body);
    await newnota.save();
    return res.status(201).json(newnota);
}

export const showNotes = async (req: Request, res: Response): Promise<Response>=>{
    
    const notas = await Notas.find({owner:req.body.owner});
    if (!notas) {
        return res.status(400).json({msg:"el usuario no tiene notas"})
    }
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

export const editContent = async (req: Request, res: Response): Promise<Response>=>{
    const notas = await Notas.updateOne({_id:req.body._id},{titulo:req.body.titulo, descripcion:req.body.descripcion});
    if (!notas) {
        return res.status(400).json({msg:"Error al intentar guardar la nota (nota no encontrada)"});
    }
    console.log(notas);
    return res.status(201).json({msg:"Guardado con exito"});

}

export const deleteNote = async (req: Request, res: Response): Promise<Response>=>{

    const nota = await Notas.findOne({_id:req.body._id});
    if(!nota){
        return res.status(400).json({msg:'La nota que busco no existe'});
    }

    const notas = await Notas.deleteOne({_id:req.body._id});
    console.log(notas);
    return res.status(201).json({msg:"Nota eliminada con exito"});

}


export const AddtoCarpeta = async (req: Request,res: Response): Promise<Response> =>{
    const carpeta = await Carpetas.findOne({nombre:req.body.nombrecarpeta})
    
    if (!carpeta) {
        return res.status(400).json({msg:"la carpeta que ingreso no existe"})
    }
    await Notas.updateOne({_id:req.body.idnota},{carpeta:req.body.nombrecarpeta});
    return res.status(201).json({msg:"nota agregada con exito"})
    
}

export const shownotesinaCarpeta = async (req: Request, res: Response): Promise<Response>=>{
    
    const notas = await Notas.find({carpeta:req.body.carpeta});
    if (!notas) {
        return res.status(400).json({msg:"La carpeta que busco no existe"})
    }
    console.log(notas);
    return res.status(201).json(notas);

}

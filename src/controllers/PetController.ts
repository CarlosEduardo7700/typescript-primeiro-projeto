import { Request, Response } from "express";
import type TypePet from "../types/TypePet";

let listaDePets: TypePet[] = [];
// let listaDePets: Array<TypePet> = [];

export default class PetController {

    criaPet(req:Request, res:Response) {
        // const { id, adotado, especie, idade, nome } = <TypePet> req.body;
        const { id, adotado, especie, idade, nome } = req.body as TypePet;

        const novoPet: TypePet = { id, adotado, especie, idade, nome }

        listaDePets.push(novoPet);
        
        return res.status(201).json(novoPet);
    }

}
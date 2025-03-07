import { Request, Response } from "express";
import type TypePet from "../types/TypePet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: TypePet[] = [];
// let listaDePets: Array<TypePet> = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {

    constructor(private repository: PetRepository) {

    }

    async criaPet (req:Request, res:Response) {
        // const { adotado, especie, idade, nome } = <TypePet> req.body;
        const { adotado, especie, dataDeNascimento, nome } = req.body as PetEntity;

        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie inválida!" })
        }

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado)

        await this.repository.criaPet(novoPet)
        
        return res.status(201).json(novoPet);
    }
    
    async listaPets (req: Request, res: Response) {
        const listaDePets = await this.repository.listaPet()

        return res.status(200).json(listaDePets)
    }

    async atualizaPet (req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizarPet(
            Number(id),
            req.body as PetEntity
        )
        
        if (!success) { 
            return res.status(404).json({ message });
        }

        return res.status(200).json({ message: "Pet atualizado com sucesso!" });
    }

    async deletaPet (req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletarPet(
            Number(id)
        )

        if (!success) {
            return res.status(404).json({ message }); 
        }

        return res.status(200).json({ mensagem: "Pet deletado com sucesso!" });
    }
}
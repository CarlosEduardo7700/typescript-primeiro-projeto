import { Request, Response } from "express";
import type TypePet from "../types/TypePet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

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
        const { adotado, especie, dataDeNascimento, nome, porte } = req.body as PetEntity;

        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Espécie inválida!" })
        }

        if (porte && !(porte in EnumPorte)) {
            return res.status(400).json({ error: "Porte inválido!" })
        }

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte)

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

    async adotaPet (req: Request, res: Response) {
        const { idPet, idAdotante } = req.params;

        const { success, message } = await this.repository.adotaPet(
            Number(idPet),
            Number(idAdotante)
        )

        if (!success) {
            return res.status(404).json({ message }); 
        }

        return res.status(200).json({ mensagem: "Pet adotado com sucesso!" });
    }
}
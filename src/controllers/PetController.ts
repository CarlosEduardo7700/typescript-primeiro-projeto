import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TypeRequestBodyPet, TypeRequestParamsPet, TypeResponseBodyPet } from "../types/typesPets";

export default class PetController {

    constructor(private repository: PetRepository) {

    }

    async criaPet (
        req:Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, 
        res:Response<TypeResponseBodyPet>
    ) {
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
        
        return res.status(201).json({data: {id: novoPet.id, nome, especie, porte}});
    }
    
    async listaPets (
        req:Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, 
        res:Response<TypeResponseBodyPet>
    ) {
        const listaDePets = await this.repository.listaPet()

        const data = listaDePets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                porte: pet.porte,
                especie: pet.especie
            }
        })

        return res.status(200).json({data})
    }

    async atualizaPet (
        req:Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, 
        res:Response<TypeResponseBodyPet>
    ) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizarPet(
            Number(id),
            req.body as PetEntity
        )
        
        if (!success) { 
            return res.status(404).json({ error: message });
        }

        return res.sendStatus(204)
    }

    async deletaPet (
        req:Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, 
        res:Response<TypeResponseBodyPet>
    ) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletarPet(
            Number(id)
        )

        if (!success) { 
            return res.status(404).json({ error: message });
        }

        return res.sendStatus(204)
    }

    async adotaPet (
        req:Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, 
        res:Response<TypeResponseBodyPet>
    ) {
        const { idPet, idAdotante } = req.params;

        const { success, message } = await this.repository.adotaPet(
            Number(idPet),
            Number(idAdotante)
        )

        if (!success) { 
            return res.status(404).json({ error: message });
        }

        return res.sendStatus(204)
    }

    async buscaPetPeloPorte(req: Request, res: Response) {
        const { porte } = req.query

        const listaDePets = await this.repository.buscaPetPeloPorte(porte as EnumPorte)

        return res.status(200).json(listaDePets)
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response) {
        const { campo, valor } = req.query

        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity, 
            valor as string
        )

        return res.status(200).json(listaDePets)
    }
}
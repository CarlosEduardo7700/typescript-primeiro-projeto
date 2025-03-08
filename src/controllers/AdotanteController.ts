import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TypeRequestBodyAdotante, TypeResponseBodyAdotante } from "../types/typesAdotantes";

export default class AdotanteController {

    constructor(private repository: AdotanteRepository) {

    }

    async criaAdotante (
        req:Request<{}, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        try {
            const { nome, celular, endereco, foto, senha } = req.body as AdotanteEntity;

            const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco)

            await this.repository.criaAdotante(novoAdotante)
            
            return res.status(201).json({ data: { id: novoAdotante.id, nome, celular } });
        } catch (error) {
            return res.status(400).json({ error: "Erro ao cadastrar!" });
        }
        
    }

    async listaAdotantes(req: Request, res: Response) {
        const listaDeAdotantes = await this.repository.listaAdotantes();
        return res.json(listaDeAdotantes);
    }
    
    async atualizaAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async deletaAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaAdotante(
            Number(id)
        );

        if (!success) {
            return res.status(404).json({ message });
        }
        
        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizaEnderecoDoAdotante(
            Number(id),
            req.body as EnderecoEntity
        );

        if (!success) {
            return res.status(404).json({ message });
        }
        
        return res.sendStatus(204);
    }
}
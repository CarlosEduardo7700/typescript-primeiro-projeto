import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TypeRequestBodyAdotante, TypeRequestParamsAdotante, TypeResponseBodyAdotante } from "../types/typesAdotantes";
import * as yup from "yup"



export default class AdotanteController {

    constructor(private repository: AdotanteRepository) {

    }

    async criaAdotante (
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        try {
            const { nome, celular, endereco, foto, senha } = req.body as AdotanteEntity;

            let bodyValidated: TypeRequestBodyAdotante          

            const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco)

            await this.repository.criaAdotante(novoAdotante)
            
            return res.status(201).json({ data: { id: novoAdotante.id, nome, celular } });
        } catch (error) {
            return res.status(400).json({ error: "Erro ao cadastrar!" });
        }
        
    }

    async listaAdotantes(
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const listaDeAdotantes = await this.repository.listaAdotantes();
        const data = listaDeAdotantes.map((adotante) => {
            return {
                id: adotante.id,
                nome: adotante.nome,
                celular: adotante.celular
            }
        })
        return res.json({data});
    }
    
    async atualizaAdotante(
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        if (!success) {
            return res.status(404).json({ error: message });
        }

        return res.sendStatus(204);
    }

    async deletaAdotante(
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaAdotante(
            Number(id)
        );

        if (!success) {
            return res.status(404).json({ error: message });
        }
        
        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizaEnderecoDoAdotante(
            Number(id),
            req.body.endereco as EnderecoEntity
        );

        if (!success) {
            return res.status(404).json({ error: message });
        }
        
        return res.sendStatus(204);
    }
}
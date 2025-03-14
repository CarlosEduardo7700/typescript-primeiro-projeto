import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { TypeRequestBodyAdotante, TypeRequestParamsAdotante, TypeResponseBodyAdotante } from "../types/typesAdotantes";


export default class AdotanteController {

    constructor(private repository: AdotanteRepository) {

    }

    async criaAdotante (
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const { nome, celular, endereco, foto, senha } = req.body as AdotanteEntity;        

        const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco)

        await this.repository.criaAdotante(novoAdotante)
        
        return res.status(201).json({ dados: { id: novoAdotante.id, nome, celular, endereco } });  
    }

    async listaAdotantes(
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const listaDeAdotantes = await this.repository.listaAdotantes();
        const dados = listaDeAdotantes.map((adotante) => {
            return {
                id: adotante.id,
                nome: adotante.nome,
                celular: adotante.celular,
                endereco: adotante.endereco !== null ? adotante.endereco : undefined
            }
        })
        return res.json({dados});
    }
    
    async atualizaAdotante(
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const { id } = req.params;

        await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        return res.sendStatus(204);
    }

    async deletaAdotante(
        req:Request<TypeRequestParamsAdotante, {}, TypeRequestBodyAdotante>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const { id } = req.params;

        await this.repository.deletaAdotante(
            Number(id)
        );
        
        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(
        req:Request<TypeRequestParamsAdotante, {}, EnderecoEntity>, 
        res:Response<TypeResponseBodyAdotante>
    ) {
        const { id } = req.params;

         await this.repository.atualizaEnderecoDoAdotante(
            Number(id),
            req.body
        );
        
        return res.sendStatus(204);
    }
}
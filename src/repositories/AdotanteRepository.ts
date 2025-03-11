import { Repository } from "typeorm";
import IAdotanteRepository from "./interfaces/IAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado } from "../utils/manipulaErros";

export default class AdotanteRepository implements IAdotanteRepository {
    private repository: Repository<AdotanteEntity>

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository
    }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante)
    }

    async listaAdotantes(): Promise<AdotanteEntity[]> {
        return await this.repository.find()
    }

    async atualizaAdotante(
        id: number, 
        adotante: AdotanteEntity
    ): Promise<{ success: boolean; message?: string; }> {
        const adotanteToUpdate = await this.repository.findOne({
            where: {
                id
            }
        })

        if (!adotanteToUpdate) {
            throw new NaoEncontrado("Adotante não encontrado!")
        }

        Object.assign(adotanteToUpdate, adotante);

        await this.repository.save(adotanteToUpdate);

        return { success: true };
    }

    async deletaAdotante(
        id: number
    ): Promise<{ success: boolean; message?: string }> {
        const adotanteToRemove = await this.repository.findOne({ 
            where: { 
                id 
            } 
        });

        if (!adotanteToRemove) {
            throw new NaoEncontrado("Adotante não encontrado!")
        }

        await this.repository.remove(adotanteToRemove);

        return { success: true };
    }

    async atualizaEnderecoDoAdotante(
        idAdotante: number, 
        endereco: EnderecoEntity
    ): Promise<{ success: boolean; message?: string; }> {
        const adotante = await this.repository.findOne({
            where: {
                id: idAdotante
            }
        })

        if(!adotante) {
            throw new NaoEncontrado("Adotante não encontrado!")
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado)
        adotante.endereco = novoEndereco
        await this.repository.save(adotante)

        return {success: true}

    }
        



}
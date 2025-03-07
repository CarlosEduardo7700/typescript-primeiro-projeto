import { Repository } from "typeorm";
import IAdotanteRepository from "./interfaces/IAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteRepository implements IAdotanteRepository {
    private repository: Repository<AdotanteEntity>

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository
    }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante)
    }



}
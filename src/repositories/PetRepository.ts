import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import IPetRepository from "./interfaces/IPetRepository";

export default class PetRepository implements IPetRepository {
    private repository: Repository<PetEntity>

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository
    }

    criaPet(pet: PetEntity): void {
        this.repository.save(pet)
    }

    listaPet(): Array<PetEntity> {
        throw new Error("Method not implemented.");
    }

    atualizarPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }

    deletarPet(id: number, pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }

}
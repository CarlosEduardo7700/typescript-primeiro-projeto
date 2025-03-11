import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import IPetRepository from "./interfaces/IPetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/manipulaErros";

export default class PetRepository implements IPetRepository {
    private repository: Repository<PetEntity>
    private adotanteRepository: Repository<AdotanteEntity>

    constructor(
        repository: Repository<PetEntity>,
        adotanteRepository: Repository<AdotanteEntity>
    ) {
        this.repository = repository
        this.adotanteRepository = adotanteRepository
    }

    criaPet(pet: PetEntity): void {
        this.repository.save(pet)
    }

    async listaPet(): Promise<PetEntity[]> {
        return await this.repository.find()
    }

    async atualizarPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> {
        const petToUpdate = await this.repository.findOne({
            where: {
                id
            }
        })

        if (!petToUpdate) {
            throw new NaoEncontrado("Pet não encontrado!")
        }

        Object.assign(petToUpdate, pet)

        await this.repository.save(petToUpdate)

        return { success: true }
    }

    async deletarPet(id: number): Promise<{ success: boolean; message?: string }> {
        const petToDelete = await this.repository.findOne({
            where: {
                id
            }
        })

        if (!petToDelete) {
            throw new NaoEncontrado("Pet não encontrado!")
        }

        await this.repository.remove(petToDelete)

        return { success: true }
    }

    async adotaPet(
        idPet: number,
        idAdotante: number
    ): Promise<{ success: boolean; message?: string }> {
        const pet = await this.repository.findOne({
            where: {
                id: idPet
            }
        })

        if (!pet) {
            throw new NaoEncontrado("Pet não encontrado!")
        }

        const adotante = await this.adotanteRepository.findOne({
            where: {
                id: idAdotante
            }
        })

        if (!adotante) {
            throw new NaoEncontrado("Adotante não encontrado!")

        }

        pet.adotante = adotante
        pet.adotado = true
        await this.repository.save(pet)

        return {success: true}
    }

    async buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]>  {
        const pets = await this.repository.find({
            where: {
                porte
            }
        })

        return pets
    }

    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> {
        const pets = await this.repository.find({
            where: {
                [campo]: valor
            }
        })

        return pets
    }

}
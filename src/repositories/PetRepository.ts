import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import IPetRepository from "./interfaces/IPetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

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
        try {
            const petToUpdate = await this.repository.findOne({
                where: {
                    id
                }
            })

            if (!petToUpdate) {
                return {
                    success: false,
                    message: "Pet não encontrado!"
                }
            }

            Object.assign(petToUpdate, pet)

            await this.repository.save(petToUpdate)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: "Erro ao tentar atualizar!"
            }
        }
    }

    async deletarPet(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const petToDelete = await this.repository.findOne({
                where: {
                    id
                }
            })

            if (!petToDelete) {
                return {
                    success: false,
                    message: "Pet não encontrado!"
                }
            }

            await this.repository.remove(petToDelete)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: "Erro ao tentar deletar!"
            }
        }
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
            return {
                success: false,
                message: "Pet não encontrado!"
            }
        }

        const adotante = await this.adotanteRepository.findOne({
            where: {
                id: idAdotante
            }
        })

        if (!adotante) {
            return {
                success: false, 
                message: "Adotante não encontrado!"
            }
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

}
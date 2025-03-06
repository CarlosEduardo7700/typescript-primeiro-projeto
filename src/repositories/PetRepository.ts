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

}
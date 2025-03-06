import PetEntity from "../../entities/PetEntity";

export default interface IPetRepository {
    criaPet(pet: PetEntity): void | Promise<void>

    listaPet(): Promise<PetEntity[]> | Array<PetEntity>
    
    atualizarPet(id: number, pet: PetEntity): void | Promise<{ success: boolean; messsage?: string }>
    
    deletarPet(id: number): void | Promise<{ success: boolean; message?: string }>
}
import PetEntity from "../../entities/PetEntity";

export default interface IPetRepository {
    criaPet(pet: PetEntity): void
    listaPet(): Array<PetEntity>
    atualizarPet(id: number, pet: PetEntity): void
    deletarPet(id: number, pet: PetEntity): void
}
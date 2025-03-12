import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface IPetRepository {
    criaPet(pet: PetEntity): void | Promise<void>

    listaPet(): Promise<PetEntity[]> | Array<PetEntity>
    
    atualizarPet(id: number, pet: PetEntity): void
    
    deletarPet(id: number): void

    adotaPet(
        idPet: number,
        idAdotante: number
    ): void

    buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | PetEntity[]

    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity> (
        campo: Tipo,
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> | PetEntity[]

}
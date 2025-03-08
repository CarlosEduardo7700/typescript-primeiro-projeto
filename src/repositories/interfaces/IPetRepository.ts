import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface IPetRepository {
    criaPet(pet: PetEntity): void | Promise<void>

    listaPet(): Promise<PetEntity[]> | Array<PetEntity>
    
    atualizarPet(id: number, pet: PetEntity): void | Promise<{ success: boolean; messsage?: string }>
    
    deletarPet(id: number): void | Promise<{ success: boolean; message?: string }>

    adotaPet(
        idPet: number,
        idAdotante: number
    ): Promise<{ success: boolean; message?: string }> | void

    buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | PetEntity[]

    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity> (
        campo: Tipo,
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> | PetEntity[]

}
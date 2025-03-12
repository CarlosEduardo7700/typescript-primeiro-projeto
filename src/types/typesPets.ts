import PetEntity from "../entities/PetEntity";

type TypeRequestBodyPet = Omit<PetEntity, "id">

type TypeRequestParamsPet = { id?: string, idPet?: string, idAdotante?: string }

type TypeResponseBodyPet = {
    dados?: Pick<PetEntity, "id" | "nome" | "porte" | "especie"> | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[];
}

export {
    TypeRequestBodyPet,
    TypeResponseBodyPet,
    TypeRequestParamsPet
}
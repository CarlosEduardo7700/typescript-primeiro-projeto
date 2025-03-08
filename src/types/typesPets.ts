import PetEntity from "../entities/PetEntity";

type TypeRequestBodyPet = Omit<PetEntity, "id">

type TypeRequestParamsPet = { id?: string, idPet?: string, idAdotante?: string }

type TypeResponseBodyPet = {
    data?: Pick<PetEntity, "id" | "nome" | "porte" | "especie"> | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[];
    error?: unknown;
}

export {
    TypeRequestBodyPet,
    TypeResponseBodyPet,
    TypeRequestParamsPet
}
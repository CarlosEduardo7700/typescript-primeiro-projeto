import AdotanteEntity from "../entities/AdotanteEntity";

type TypeRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">

type TypeRequestParamsAdotante = { id?: string }

type TypeResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco"> | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[];
    error?: unknown;
}

export {
    TypeRequestBodyAdotante,
    TypeResponseBodyAdotante,
    TypeRequestParamsAdotante
}
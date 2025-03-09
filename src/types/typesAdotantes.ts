import AdotanteEntity from "../entities/AdotanteEntity";

type TypeRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">

type TypeRequestParamsAdotante = { id?: string }

type TypeResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular"> | Pick<AdotanteEntity, "id" | "nome" | "celular">[];
    error?: unknown;
}

export {
    TypeRequestBodyAdotante,
    TypeResponseBodyAdotante,
    TypeRequestParamsAdotante
}
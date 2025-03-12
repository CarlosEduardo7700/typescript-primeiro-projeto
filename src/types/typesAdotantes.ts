import AdotanteEntity from "../entities/AdotanteEntity";

type TypeRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">

type TypeRequestParamsAdotante = { id?: string }

type TypeResponseBodyAdotante = {
    dados?: Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco"> | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[];
}

export {
    TypeRequestBodyAdotante,
    TypeResponseBodyAdotante,
    TypeRequestParamsAdotante
}
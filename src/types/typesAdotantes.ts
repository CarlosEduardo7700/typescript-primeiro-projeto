import AdotanteEntity from "../entities/AdotanteEntity";

type TypeRequestBodyAdotante = Omit<AdotanteEntity, "id">
type TypeResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular">,
    error?: unknown
}

export {
    TypeRequestBodyAdotante,
    TypeResponseBodyAdotante
}
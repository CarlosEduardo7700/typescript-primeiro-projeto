import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface IAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>
}
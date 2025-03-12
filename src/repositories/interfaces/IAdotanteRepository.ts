import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface IAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>

    listaAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>

    atualizaAdotante(
        id: number,
        adotante: AdotanteEntity
    ): void

    deletaAdotante(
        id: number
    ): void

    atualizaEnderecoDoAdotante(
        idAdotante: number,
        endereco: EnderecoEntity
    ): void
}
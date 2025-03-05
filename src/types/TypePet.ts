import EnumEspecie from "../enum/EnumEspecie"

type TypePet = {
    id: number
    nome: string
    especie: EnumEspecie
    adotado: boolean
    dataDeNascimento: Date
}

export default TypePet
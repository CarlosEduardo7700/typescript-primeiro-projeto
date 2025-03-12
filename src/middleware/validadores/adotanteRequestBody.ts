import { NextFunction, Request, Response } from "express";
import { TypeRequestBodyAdotante } from "../../types/typesAdotantes";
import * as yup from "yup"
import { pt } from "yup-locale-pt"
import tratarErroValidacaoYup from "../../utils/tratarErroValidacaoYup";

yup.setLocale(pt)

const squemaBodyAdotante: yup.ObjectSchema<Omit<TypeRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    celular: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "Celular inválido!"),
    senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "Senha inválida!"),
    foto: yup.string().optional(),
})

const middlewareValidadorDoBodyDeAdotante = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    tratarErroValidacaoYup(squemaBodyAdotante, req, res, next);
 }

export { middlewareValidadorDoBodyDeAdotante }
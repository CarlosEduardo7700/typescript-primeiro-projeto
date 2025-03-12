import { NextFunction, Request, Response } from "express";
import * as yup from "yup"
import EnderecoEntity from "../../entities/EnderecoEntity";
import { pt } from "yup-locale-pt"
import tratarErroValidacaoYup from "../../utils/tratarErroValidacaoYup";

yup.setLocale(pt)

const squemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required()
})

const middlewareValidadorDoBodyDeEndereco = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    tratarErroValidacaoYup(squemaBodyEndereco, req, res, next);
 }

export { middlewareValidadorDoBodyDeEndereco }
import { NextFunction, Request, Response } from "express";
import * as yup from "yup"
import { TypeRequestBodyAdotante } from "../../types/typesAdotantes";

const squemaBodyAdotante: yup.ObjectSchema<Omit<TypeRequestBodyAdotante, "endereco">> = yup.object({
    nome: yup.string().defined().required(),
    celular: yup.string().defined().required(),
    senha: yup.string().defined().required().min(6),
    foto: yup.string().optional(),
})

const middlewareValidadorDoBodyDeAdotante = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {

        await squemaBodyAdotante.validate(req.body, {
            abortEarly: false
        })
        return next()

    } catch (error) {

        const yupErrors = error as yup.ValidationError

        const validationErros: Record<string, string> = {}

        yupErrors.inner.forEach((error) => {
            if (!error.path) return

            validationErros[error.path] = error.message
        })

        return res.status(400).json({ error: validationErros })

    }
 }

export { middlewareValidadorDoBodyDeAdotante }
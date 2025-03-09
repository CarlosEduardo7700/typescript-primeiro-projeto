import express, { RequestHandler } from "express"
import AdotanteRepository from "../repositories/AdotanteRepository"
import { AppDataSource } from "../config/dataSource"
import AdotanteController from "../controllers/AdotanteController"
import { middlewareValidadorDoBodyDeAdotante } from "../middleware/validadores/adotanteRequestBody"

const router = express.Router()

const adotanteRepository = new AdotanteRepository(
    AppDataSource.getRepository("AdotanteEntity")
)

const adotanteController = new AdotanteController(adotanteRepository)

const validateBody: RequestHandler = (req, res, next) => {middlewareValidadorDoBodyDeAdotante(req, res, next)}

router.post("/", validateBody, (req, res) => {adotanteController.criaAdotante(req, res)})
router.get("/", (req, res) => {adotanteController.listaAdotantes(req, res)})
router.put("/:id", (req, res) => {adotanteController.atualizaAdotante(req, res)})
router.delete("/:id", (req, res) => {adotanteController.deletaAdotante(req, res)})
router.patch("/:id", (req, res) => {adotanteController.atualizaEnderecoAdotante(req, res)})

export default router
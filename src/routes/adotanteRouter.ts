import express, { RequestHandler } from "express"
import AdotanteRepository from "../repositories/AdotanteRepository"
import { AppDataSource } from "../config/dataSource"
import AdotanteController from "../controllers/AdotanteController"
import { middlewareValidadorDoBodyDeAdotante } from "../middleware/validadores/adotanteRequestBody"
import { middlewareValidadorDoBodyDeEndereco } from "../middleware/validadores/enderecoRequestBody"
import { verificaIdMiddleware } from "../middleware/verificaId"

const router = express.Router()

const adotanteRepository = new AdotanteRepository(
    AppDataSource.getRepository("AdotanteEntity")
)

const adotanteController = new AdotanteController(adotanteRepository)

const validateBodyAdotante: RequestHandler = (req, res, next) => {middlewareValidadorDoBodyDeAdotante(req, res, next)}
const validateBodyEndereco: RequestHandler = (req, res, next) => {middlewareValidadorDoBodyDeEndereco(req, res, next)}

router.post("/", validateBodyAdotante, (req, res) => {adotanteController.criaAdotante(req, res)})
router.get("/", (req, res) => {adotanteController.listaAdotantes(req, res)})
router.put("/:id", verificaIdMiddleware, (req, res) => {adotanteController.atualizaAdotante(req, res)})
router.delete("/:id", verificaIdMiddleware, (req, res) => {adotanteController.deletaAdotante(req, res)})
router.patch("/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) => {adotanteController.atualizaEnderecoAdotante(req, res)})

export default router
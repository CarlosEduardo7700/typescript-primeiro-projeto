import express from "express";
import PetController from "../controllers/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorDoBodyDePet } from "../middleware/validadores/petRequestBody";
import { RequestHandler } from "express-serve-static-core";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();

const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);

const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) => {middlewareValidadorDoBodyDePet(req, res, next)}

router.post('/', validateBodyPet, (req, res) => {petController.criaPet(req, res)})
router.get('/', (req, res) => {petController.listaPets(req, res)})
router.put('/:id', verificaIdMiddleware, (req, res) => {petController.atualizaPet(req, res)})
router.delete('/:id', verificaIdMiddleware, (req, res) => {petController.deletaPet(req, res)})
router.put('/:idPet/:idAdotante', verificaIdMiddleware, (req, res) => {petController.adotaPet(req, res)})
router.get('/filtro-por-porte', (req, res) => {petController.buscaPetPeloPorte(req, res)})
router.get('/filtro', (req, res) => {petController.buscaPetPorCampoGenerico(req, res)})

export default router
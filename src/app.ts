import "express-async-errors";
import express from "express";
import router from "./routes";
import "reflect-metadata"
import { AppDataSource } from "./config/dataSource";
import { erroMiddleware } from "./middleware/erro";

const app = express();
app.use(express.json());
router(app)

// app.get('/test', () => {
//   throw new Error("teste de erro")
// })

app.use(erroMiddleware);

AppDataSource.initialize()
  .then(() => console.log("Banco de Dados conectado!"))
  .catch((erro) => console.log(erro))


export default app;

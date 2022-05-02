import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import errorHandler from "./errorHandlerMiddlaware"

import { initializeDataSource } from "./data-source";

import { routes } from "./routes";

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(routes);

app.use(errorHandler);

initializeDataSource();

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
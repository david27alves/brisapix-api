import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";

import { initializeDataSource } from "./data-source";

console.log("xxx", process.env.DB_PASS)

import { routes } from "./routes";

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(routes);

initializeDataSource();

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
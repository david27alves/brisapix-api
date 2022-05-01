import "reflect-metadata";
import express from "express";

import { routes } from "./routes";

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
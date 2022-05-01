/*
*  
* 
*/

import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "desafio_brisalabs",
    entities: ["src/entities/*.ts"],
    migrations: ["src/db/migrations/*.ts"]

});

AppDataSource.initialize()
.catch((err) => {
    console.error("Erro ao conectar no banco.", err);
});
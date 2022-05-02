/*
*
*  Esse arquivo é responsável por fazer a conexão com o banco,
*  a função isTesting() serve para verificar se está rodando com
*  um teste do Jest. Se isTesting for true ele faz a conexão com
*  o banco em memória para realizar os testes.
*
*/

import "reflect-metadata";
import { DataSource } from "typeorm";

import { isTesting } from "./test-utils/TestUtils"; 


function resolveDataSource() {

    if (isTesting()) {
        return new DataSource({
            name: 'default',
            type: 'better-sqlite3',
            database: ':memory:',
            entities: ['src/entities/*.ts'],
            migrations: ["src/db/migrations/*.ts"],
            synchronize: true
        })
    }
    
    return new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: ["src/entities/*.ts"],
        migrations: ["src/db/migrations/*.ts"]
    });

}

export const AppDataSource = resolveDataSource();

export async function initializeDataSource() {
    await AppDataSource.initialize()
    .then(() => {
        
    })
    .catch((err) => {
        console.error("Erro ao conectar no banco.", err);
    });
}




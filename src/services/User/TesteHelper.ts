import { DataSource } from 'typeorm';

import {Connection, createConnection } from 'typeorm';
import Database from 'better-sqlite3';

export class TestHelper {

    private static _instance: TestHelper;

    private constructor() {}

    public static get instance(): TestHelper {
        if(!this._instance) this._instance = new TestHelper();

        return this._instance;
    }

    private dataSource!: DataSource;
    private testdb!: any;


    async setupTestDB() {

    
        console.log("Teste");

        this.testdb = new Database(':memory:', { verbose: console.log });

        console.log("DB em memoria criado");

        this.dataSource = new DataSource({
            name: 'default',
            type: 'better-sqlite3',
            database: ':memory:',
            entities: ['src/entities/*.ts'],
            migrations: ["src/db/migrations/*.ts"],
            synchronize: true
        });

        await this.dataSource.initialize()
    
        console.log("conexao criada");

    }

    teardownTestDB() {
        this.dataSource.close();
        this.testdb.close();
    }

}
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransactions1651330052552 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "valor",
                        type: "float8",
                    },
                    {
                        name: "id_chave_enviou",
                        type: "uuid"
                    },
                    {
                        name: "id_chave_recebeu",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_transactions_id_chave_enviou",
                        columnNames: ["id_chave_enviou"],
                        referencedTableName: "keys_pix",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_transactions_id_chave_recebeu",
                        columnNames: ["id_chave_recebeu"],
                        referencedTableName: "keys_pix",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }

}

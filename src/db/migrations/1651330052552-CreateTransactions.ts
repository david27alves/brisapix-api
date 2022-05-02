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
                        name: "value",
                        type: "float8",
                    },
                    {
                        name: "idKeySend",
                        type: "uuid"
                    },
                    {
                        name: "idKeyReceiver",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_transactions_idKeySend",
                        columnNames: ["idKeySend"],
                        referencedTableName: "keyspix",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_transactions_idKeyReceiver",
                        columnNames: ["idKeyReceiver"],
                        referencedTableName: "keyspix",
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

import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateKeys1651288691257 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "keys_pix",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "valor_chave_pix",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "id_user",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_keys_pix_users",
                        columnNames: ["id_user"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("keys_pix");
    }

}

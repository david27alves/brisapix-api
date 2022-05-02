import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateKeys1651288691257 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "keyspix",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "valueKeyPix",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "idUser",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_keys_pix_users",
                        columnNames: ["idUser"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("keyspix");
    }

}

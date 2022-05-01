import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("keys_pix")
export class KeyPix {

    @PrimaryColumn()
    id: string;

    @Column()
    valor_chave_pix: string;

    @Column()
    id_user: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_user" })
    user: User;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}
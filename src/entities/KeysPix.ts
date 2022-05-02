/*
*
*  Entidade que representa a tabela keyspix
*
*/

import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./Users";

@Entity("keyspix")
export class KeyPix {

    @PrimaryColumn()
    id?: string;

    @Column()
    valueKeyPix: string;

    @Column()
    idUser: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "idUser" })
    user?: User;

    // caso o id chegue vazio ele gera um uuid
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}
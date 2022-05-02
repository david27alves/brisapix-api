/*
*
*  Entidade que representa a tabela users
*
*/

import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {

    @PrimaryColumn()
    id?: string;
    
    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    // Caso o id venha vazio ele gera um uuid 
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}


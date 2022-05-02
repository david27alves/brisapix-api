/*
*
*  Entidade que representa a tabela transactions
*
*/

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./Users";


@Entity("transactions")
export class Transactions {

    @PrimaryColumn()
    id?: string;

    @Column({ type: "real" })
    value: number;
    
    @Column()
    idKeySend: string;

    @Column()
    idKeyReceiver: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "idKeySend" })
    @JoinColumn({ name: "idKeyReceiver" })
    user?: User;

    // caso id chegue vazio ele gera um uuid
    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}

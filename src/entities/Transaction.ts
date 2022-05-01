import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";


@Entity("transactions")
export class Transaction {

    @PrimaryColumn()
    id: string;

    @Column({ type: "real" })
    valor: number;
    
    @Column()
    id_chave_enviou: string;

    @Column()
    id_chave_recebeu: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "id_chave_enviou" })
    @JoinColumn({ name: "id_chave_recebeu" })
    user: User;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

}

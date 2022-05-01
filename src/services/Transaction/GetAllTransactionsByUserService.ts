import { AppDataSource } from "../../data-source";
import { KeyPix } from "../../entities/KeyPix";
import { Transaction } from "../../entities/Transaction";

type TransactionRequest = {
    id: string;
}

export class GetAllTransactionsByUserService {

    /*
    * Aqui a função execute recebe o id do usuario
    */
    async execute({ id }: TransactionRequest) {
        
        const keysPixRepository = AppDataSource.getRepository(KeyPix);

        const keysUser = await keysPixRepository.find({
            where: {
                id_user: id
            }
        });


        if (keysUser.length == 0) {
            return new Error("Nada encontrado!")
        }

        const transactionRepository = AppDataSource.getRepository(Transaction);

        const transactionsUserSend = await transactionRepository.find({
            where: {
                id_chave_enviou: keysUser[0].id
            },
            relations: ["user"]
        });


        const transactionsUserReceiver = await transactionRepository.find({
            where: {
                id_chave_recebeu: keysUser[0].id
            }
        });


        const transactions = {...transactionsUserSend, ...transactionsUserReceiver};

        return transactions;

    }

}
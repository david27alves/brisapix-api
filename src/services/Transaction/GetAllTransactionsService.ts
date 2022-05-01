import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/Transaction";


export class GetAllTransactionsService {

    async execute() {

        const transactionRepository = AppDataSource.getRepository(Transaction);

        const transactions = await transactionRepository.find();

        return transactions;

    }

}
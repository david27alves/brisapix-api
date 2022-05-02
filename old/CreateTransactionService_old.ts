import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/Transaction";
import { KeyPix } from "../../entities/KeyPix";
import { SendMailService } from "../mail/SendMailService";
import { User } from "../../entities/User";

type TransactionRequest = {
    valor: number;
    enviou_chave_pix: string;
    recebeu_chave_pix: string;
}

export class CreateTransactionService {

    async execute({ valor, enviou_chave_pix, recebeu_chave_pix }: TransactionRequest): Promise<Transaction | Error> {

        const transactionsRepository = AppDataSource.getRepository(Transaction);

        const keyPixRepository = AppDataSource.getRepository(KeyPix);

        const userRepository = AppDataSource.getRepository(User);
        
        /*
        * o controller vai enviar uma chave pix
        * a função execute() recebe o valor da chave pix 
        * esse linha checa se tem algum user com a chave informada
        * e retornar o id do user que possui a chave 
        */

        
        const user_env = await keyPixRepository.findOneBy({ 
            valor_chave_pix: enviou_chave_pix 
        });
        
        const user_rec = await keyPixRepository.findOneBy({ 
            valor_chave_pix:  recebeu_chave_pix
        });
        


        if (!user_env || !user_rec) {
            return new Error("Erro ao enviar: verifique se as chaves de recebimento e envio estão corretas!");
        }
        

        const transaction = transactionsRepository.create({
            valor,
            id_chave_enviou: user_env.id,
            id_chave_recebeu: user_rec.id,
        });

        await transactionsRepository.save(transaction);


        const userSendResult = await userRepository.findOneBy({ id: user_env.id_user });
        const emailSend = userSendResult.email;

        const UserReceiverResult = await userRepository.findOneBy({ id: user_rec.id_user });
        const emailReceiver = UserReceiverResult.email;


        const service = new SendMailService()


        await service.execute({ emailSend, emailReceiver, valor });

        
        return transaction;

    }

}
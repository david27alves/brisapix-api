import { AppDataSource } from "../../data-source";
import { Transactions } from "../../entities/Transactions";
import { KeyPix } from "../../entities/KeysPix";
import { sendMailService } from "../Mail/MailService";
import { User } from "../../entities/Users";

type TransactionRequest = {
    value: number;
    sendKeyPix: string;
    receiverKeyPix: string;
}

export async function createTransactionService({ value, sendKeyPix, receiverKeyPix }: TransactionRequest): Promise<Transactions | Error> {

    if (!value || !sendKeyPix || !receiverKeyPix) {
        return new Error("Verifique se todas as informações foram preenchidas!");    
    }

    const transactionsRepository = AppDataSource.getRepository(Transactions);

    const keyPixRepository = AppDataSource.getRepository(KeyPix);

    const userRepository = AppDataSource.getRepository(User);
    
    /*
    * o controller vai enviar uma chave pix
    * a função execute() recebe o valor da chave 
    * esse linha checa se tem algum user com a chave informada
    * e retornar o id do user que possui a chave 
    */
    
    const userSend = await keyPixRepository.findOneBy({ 
        valueKeyPix: sendKeyPix 
    });
    
    const userReceiver = await keyPixRepository.findOneBy({ 
        valueKeyPix:  receiverKeyPix
    });
    


    if (!userSend || !userReceiver) {
        return new Error("Erro ao enviar: verifique se as chaves de recebimento e envio estão corretas!");
    }
    

    const transaction = transactionsRepository.create({
        value,
        idKeySend: userSend.id,
        idKeyReceiver: userReceiver.id,
    });

    await transactionsRepository.save(transaction);


    const userSendResult = await userRepository.findOneBy({ id: userSend.idUser });
    const nameSend = userSendResult.name
    const emailSend = userSendResult.email;

    const UserReceiverResult = await userRepository.findOneBy({ id: userReceiver.idUser });
    const nameReceiver = UserReceiverResult.name
    const emailReceiver = UserReceiverResult.email;


    await sendMailService({ nameSend, nameReceiver, emailSend, emailReceiver, value });

    
    return transaction;

}

export async function getAllTransactionsService() {

    const transactionRepository = AppDataSource.getRepository(Transactions);

    const transactions = await transactionRepository.find();

    return transactions;

}


type TransactionReq = {
   id: string;
}
/*
* Aqui a função getAllTransactionsByUserService recebe o id do usuario para retornar
* todas as transações realizadas por ele
*/
export async function getAllTransactionsByUserService({ id }: TransactionReq) {
    
    //
    const keysPixRepository = AppDataSource.getRepository(KeyPix);

    const keysUser = await keysPixRepository.find({
        where: {
            idUser: id
        }
    });

    // se nenhuma chave de envio ou recebimento for encontrada ele para aqui
    if (keysUser.length == 0) {
        return new Error("Nada encontrado!")
    }

    const transactionRepository = AppDataSource.getRepository(Transactions);

    const transactionsUserSend = await transactionRepository.find({
        where: {
            idKeySend: keysUser[0].id
        }
    });

    const transactionsUserReceiver = await transactionRepository.find({
        where: {
            idKeyReceiver: keysUser[0].id
        }
    });

    const transactions = {...transactionsUserSend, ...transactionsUserReceiver};

    return transactions;

}


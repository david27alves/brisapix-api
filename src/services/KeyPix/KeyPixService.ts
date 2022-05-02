import { AppDataSource } from "../../data-source";
import { KeyPix } from "../../entities/KeysPix";
import { User } from "../../entities/Users";

type KeyPixRequest = {
    valueKeyPix: string;
    idUser: string;
};
    
export async function createKeyPixService({ valueKeyPix, idUser }: KeyPixRequest): Promise<KeyPix | Error> {

    if (!valueKeyPix || !idUser) {
        return new Error("Verifique se todas as informações foram preenchidas!");    
    }

    const keyPixRepository = AppDataSource.getRepository(KeyPix);
    const userRepository = AppDataSource.getRepository(User);
    
    // checando se a chave foi informada
    if (!valueKeyPix) {
        return new Error("Nenhuma chave informada!");
    }

    // checando se a chave já foi cadastrada
    const resultKey = await keyPixRepository.findOneBy({ valueKeyPix });
    
    if (resultKey) {
        return new Error("Chave já cadastrada!");
    }

    // checando se o usuário informado existe
    const resultIdUser = await userRepository.findOneBy({ id: idUser });

    if (!resultIdUser) {
        return new Error("Nenhum usuário com esse id encontrado!");
    }

    // busca todas as chaves cadastradas e verifica o array de chaves é maior ou igual a 3
    const allKeysPixUser = await keyPixRepository.find({
        where: {
            idUser: idUser
        }
    });
    if (allKeysPixUser.length >= 3) {
        return new Error("O máximo de chaves cadastradas é 3!");
    }
    
    
    const keyPix = keyPixRepository.create({
        valueKeyPix,
        idUser
    });

    // gravando a chave com id do usuario no banco
    await keyPixRepository.save(keyPix)

    return keyPix;
}


export async function getAllKeysPixService() {

    const keyPixRepository = AppDataSource.getRepository(KeyPix);

    const keysPix = await keyPixRepository.find({
        relations: ["user"]
    });

    return keysPix;

}


export async function getKeyPixByValueService(valueKeyPix: string) {

    const keyPixRepository = AppDataSource.getRepository(KeyPix);

    const keyPix = await keyPixRepository.findOneBy({ valueKeyPix });

    return keyPix;

}

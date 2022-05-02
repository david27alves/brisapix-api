import { AppDataSource } from "../../data-source" 
import { KeyPix } from "../../entities/KeyPix";
import { User } from "../../entities/User";

type KeyPixRequest = {
    valor_chave_pix: string;
    id_user: string;
};

export class CreateKeyPixService {
    
    async execute({ valor_chave_pix, id_user }: KeyPixRequest): Promise<KeyPix | Error> {

        const keyPixRepository = AppDataSource.getRepository(KeyPix);
        const userRepository = AppDataSource.getRepository(User);
                
        if (!valor_chave_pix) {
            return new Error("Nenhuma chave informada!");
        }

        const resultKey = await keyPixRepository.findOneBy({ valor_chave_pix });

        if (resultKey) {
            return new Error("Chave já cadastrada!");
        }

        const id = id_user;

        const resultIdUser = await userRepository.findOneBy({ id });

        if (!resultIdUser) {
            return new Error("Nenhum usuário com esse id encontrado!");
        }

        const keyPix = keyPixRepository.create({
            valor_chave_pix,
            id_user
        });

        await keyPixRepository.save(keyPix)
    
        return keyPix;
    }

}
import { AppDataSource } from "../../data-source";
import { KeyPix } from "../../entities/KeyPix";

export class GetAllKeysPixService {
    
    async execute() {

        const keyPixRepository = AppDataSource.getRepository(KeyPix);

        const keysPix = await keyPixRepository.find({
            relations: ["user"]
        });

        return keysPix;
    
    }

}
import { TestHelper }  from "../../test-utils/TesteHelper";
import { KeyPix } from "../../entities/KeysPix";
import { User } from "../../entities/Users";
import { createUserService,getUserByEmailService } from "../User/UserService";
import { createKeyPixService, getKeyPixByValueService } from "./KeyPixService";

beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe("Intermediario", () => {

    const userData: User = {
        name: "Test User",
        phone: "(99)99999-9999",
        email: "test@test.com"
    }

    it("O sistema deve ser capaz de cadastrar chaves PIX para os usuários já cadastrados.", async () => {

        // aqui o teste consulta o user e espera nao encontrar
        const user = await getUserByEmailService(userData.email);

        expect(user).toBeNull();
        
        // aqui ele cria o user e espera receber
        await createUserService(userData);

        const newUser = await getUserByEmailService(userData.email);

        expect(newUser).toBeDefined();
        
        expect(userData.name).toEqual(newUser.name);
        expect(userData.phone).toEqual(newUser.phone);
        expect(userData.email).toEqual(newUser.email);

        
        const keyPixData1: KeyPix = {
            valueKeyPix: "test1@test.com",
            idUser: newUser.id
        }

        const keyPixData2: KeyPix = {
            valueKeyPix: "test2@test.com",
            idUser: newUser.id
        }

        const keyPixData3: KeyPix = {
            valueKeyPix: "test3@test.com",
            idUser: newUser.id
        }

        const keyPixData4: KeyPix = {
            valueKeyPix: "test1@test.com",
            idUser: newUser.id
        }

        const keysPix = await getKeyPixByValueService(keyPixData1.valueKeyPix);

        expect(keysPix).toBeNull();

        await createKeyPixService(keyPixData1);
        
        const newKeyPix = await getKeyPixByValueService(keyPixData1.valueKeyPix);
           
        expect(newKeyPix).toBeDefined();

        expect(keyPixData1.valueKeyPix).toEqual(newKeyPix.valueKeyPix);
        expect(keyPixData1.idUser).toEqual(newKeyPix.idUser);
        

    });

    /*it("Uma chave não poderá ser cadastrada mais de uma vez.", async () => {
            
        console.log(await createKeyPixService(keyPixData4));
        
    });

    it("Cada usuário poderá ter no máximo 3 chaves.", async() => {
                
        await createKeyPixService(keyPixData2);
        await createKeyPixService(keyPixData3);
        await createKeyPixService(keyPixData4);

        const newKeyPixExc = await getKeyPixByValueService(keyPixData4.valueKeyPix);
        
        expect(newKeyPixExc).toBeNull();
    });*/

});
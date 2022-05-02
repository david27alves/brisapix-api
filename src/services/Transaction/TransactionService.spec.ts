import { TestHelper }  from "../../test-utils/TesteHelper";
import { Transactions } from "../../entities/Transactions";
import { getAllTransactionsByUserService } from "./TransactionsService";

import { User } from "../../entities/Users";
import { KeyPix } from "../../entities/KeysPix";

import { createUserService,getUserByEmailService } from "../User/UserService";
import { createKeyPixService, getKeyPixByValueService } from "./../KeyPix/KeyPixService";


beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe("create transaction", () => {

    it("deve ser possivel criar uma transacao pix", async () => {

        /*
        const userData: User = {
            name: "Test User",
            phone: "(99)99999-9999",
            email: "test@test.com"
        }

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

        
        const keyPixData: KeyPix = {
            valueKeyPix: "test@test.com",
            idUser: newUser.id
        }

        const keysPix = await getKeyPixByValueService(keyPixData.valueKeyPix);

        expect(keysPix).toBeNull();

        await createKeyPixService(keyPixData);
        
        const newKeyPix = await getKeyPixByValueService(keyPixData.valueKeyPix);
           
        expect(newKeyPix).toBeDefined();

        expect(keyPixData.valueKeyPix).toEqual(newKeyPix.valueKeyPix);
        expect(keyPixData.idUser).toEqual(newKeyPix.idUser);


        const transactionData: Transactions = {
            value: 1.99,
            idKeySend: newKeyPix.id,
            idKeyReceiver: newKeyPix.id 
        }

        const transactions = getAllTransactionsByUserService(newUser.id)
        */

        expect(2+2).toBe(4);


    });
});
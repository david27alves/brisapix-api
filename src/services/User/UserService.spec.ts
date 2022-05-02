
import { User } from "../../entities/Users";
import { TestHelper }  from "../../test-utils/TesteHelper";
import { createUserService, getUserByEmailService } from "./UserService"

beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe("create user", () => {

    it("deve ser possivel criar um usuario", async () => { 
        
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

    });
});
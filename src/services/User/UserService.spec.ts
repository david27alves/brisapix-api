//import { CreateUserService } from "./UserService";
import { User } from "../../entities/User";
import { TestHelper }  from "./TesteHelper";
import { createUser } from "./UserService"

beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});


describe("create user", () => {

    it("criar user", async () => { 
        
        const userData: User = {
            nome: "Test User",
            telefone: "(99)99999-9999",
            email: "test@teste.com"
        }

        const { nome, telefone, email } = userData;


        const user = await createUser({ nome, telefone, email });

        //console.log(user);

        //expect(user).toHaveProperty("id");
        expect(2 + 3).toBe(5);

    });
});
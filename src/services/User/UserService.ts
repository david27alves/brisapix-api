import { AppDataSource } from "../../data-source";
import { User } from "../../entities/Users";

type UserRequest = {
    name: string;
    phone: string;
    email: string;
};

export async function createUserService({ name, phone, email }: UserRequest): Promise<User | Error> {
    
    // checa se todos os dados foram preenchidos
    if (!name || !phone || !email) {
        return new Error("Verifique se todas as informações foram preenchidas!");    
    }

    const userRepository = AppDataSource.getRepository(User);
    
    // checando se o email já foi cadastrado
    const userResult = await userRepository.findOneBy({ email })

    if (userResult) {            
        return new Error("Email já cadastrado!");
    }

    const user = userRepository.create({
        name,
        phone,
        email
    });


    await userRepository.save(user);

    return user;
}


export async function getAllUsersService() {

    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    return users;
}

// função usada para validar testes de user cadastrado 
export async function getUserByEmailService(email: string) {

    const userRepository = AppDataSource.getRepository(User);

    const user  = await userRepository.findOneBy({ email });

    return user;

}
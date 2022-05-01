import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";

type UserRequest = {
    nome: string;
    telefone: string;
    email: string;
};

export async function createUser({ nome, telefone, email }: UserRequest): Promise<User | Error> {
    
    const userRepository = AppDataSource.getRepository(User);
    
    const res = await userRepository.findOneBy({ email })

    if (res) {            
        return new Error("Email já cadastrado!");
    }

    const user = userRepository.create({
        nome,
        telefone,
        email
    });


    await userRepository.save(user);

    return user;
}


export async function getAllUsers() {

    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();

    return users;
}

import { Request, Response } from "express";
import { createUserService, getAllUsersService } from "../../services/User/UserService";

export async function createUser(request: Request, response: Response) {

    const { name, phone, email } = request.body;

    const result = await createUserService({ name, phone, email });

    if (result instanceof Error) {
        return response.status(400).json(result.message);
    }
    
    return response.json(result);

}

export async function getAllUsers(request: Request, response: Response) {

    const result = await getAllUsersService();

    return response.json(result);

} 

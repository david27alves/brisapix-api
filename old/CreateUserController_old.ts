import { Request, Response } from "express";
import { createUser } from "../../services/User/UserService";

export class CreateUserController {

    async handle(request: Request, response: Response) {

        const { nome, telefone, email } = request.body;

        const result = await createUser({ nome, telefone, email });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.json(result);

    }

}
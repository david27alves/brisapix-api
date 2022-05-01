import { Request, Response } from "express";
import { getAllUsers } from "../../services/User/UserService";

export class GetAllUsersController {

    async handle(request: Request, response: Response) {

        const result = await getAllUsers();

        return response.json(result);

    } 

}
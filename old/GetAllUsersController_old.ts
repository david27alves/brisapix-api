import { Request, Response } from "express";
import { getAllUsersService } from "../../services/User/UserService";

export class GetAllUsersController {

    async handle(request: Request, response: Response) {

        const result = await getAllUsersService();

        return response.json(result);

    } 

}
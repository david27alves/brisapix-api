import { Request, Response } from "express";
import { Transaction } from "../../entities/Transaction";
import { GetAllTransactionsByUserService } from "../../services/Transaction/GetAllTransactionsByUserService";



export class GetAllTransactionsByUserController {

    async handle(request: Request, response: Response) {
        
        const id = request.params.id;

        const service = new GetAllTransactionsByUserService();

        const result = await service.execute({ id });

        if (result instanceof Error) {
            return response.status(400).json(result.message)
        }

        //console.log(id)

        return response.json(result);
    }

}
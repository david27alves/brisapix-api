import { Request, Response } from "express";
import { GetAllTransactionsService } from "../../services/Transaction/GetAllTransactionsService_old";

export class GetAllTrransactionsController {

    async handle(request: Request, response: Response) {
        
        const service = new GetAllTransactionsService();

        const result = await service.execute();

        return response.json(result);

    }

}
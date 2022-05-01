import { Request, Response } from "express";
import { CreateTransactionService } from "../../services/Transaction/CreateTransactionService";

export class CreateTransactionController {
    
    async handle(request: Request, response: Response) {

        const { valor, enviou_chave_pix, recebeu_chave_pix } = request.body;

        const service = new CreateTransactionService();

        const result = await service.execute({ valor, enviou_chave_pix, recebeu_chave_pix });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);

    }
}
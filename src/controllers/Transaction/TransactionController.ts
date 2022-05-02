import { Request, Response } from "express";
import { createTransactionService, getAllTransactionsByUserService, getAllTransactionsService } from "../../services/Transaction/TransactionsService";

    
export async function createTransaction(request: Request, response: Response) {

    const { value, sendKeyPix, receiverKeyPix } = request.body;

    const result = await createTransactionService({ value, sendKeyPix, receiverKeyPix });

    if (result instanceof Error) {
        return response.status(400).json(result.message);
    }

    return response.json(result);

}

export async function getAllTransactions(request: Request, response: Response) {

    const result = await getAllTransactionsService();

    return response.json(result);

}

export async function getAllTransactionsByUser(request: Request, response: Response) {
        
    const id = request.params.id;

    const result = await getAllTransactionsByUserService({ id });

    if (result instanceof Error) {
        return response.status(400).json(result.message)
    }

    return response.json(result);

}
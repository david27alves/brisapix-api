import { Request, Response } from "express";
import { createKeyPixService, getAllKeysPixService } from "../../services/KeyPix/KeyPixService";

export async function createKeyPix(request: Request, response: Response) {
    
    const { valueKeyPix, idUser } = request.body;

    const result = await createKeyPixService({ valueKeyPix, idUser });

    if (result instanceof Error) {
        return response.status(400).json(result.message);
    }

    return response.json(result);

}

export async function getAllKeysPix(request: Request, response: Response) {

    const result = await getAllKeysPixService();

    return response.json(result);

}

/*
export async function getKeyPixById(request: Request, response: Response) {
    
    const id = request.params.id;

    const result = await getKeyPixByIdService(id);

    return response.json(result);
}*/


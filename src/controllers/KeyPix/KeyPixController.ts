import { Request, Response } from "express";
import { CreateKeyPixService } from "../../services/KeyPix/CreateKeyPixService";
import { GetAllKeysPixService } from "../../services/KeyPix/GetAllKeysPixService";



export async function createKeyPix(request: Request, response: Response) {
    const { valor_chave_pix, id_user } = request.body;

    const service = new CreateKeyPixService();

    const result = await service.execute({ valor_chave_pix, id_user });

    if (result instanceof Error) {
        return response.status(400).json(result.message);
    }

    return response.json(result);

}

export async function getAllKeyPix(request: Request, response: Response) {

    const service = new GetAllKeysPixService();

    const result = await service.execute();

    return response.json(result);

}


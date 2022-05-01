import { Request, Response } from "express";
import { CreateKeyPixService } from "../../services/KeyPix/CreateKeyPixService";

export class CreateKeyPixController {

    async handle(request: Request, response: Response) {
        const { valor_chave_pix, id_user } = request.body;

        const service = new CreateKeyPixService();

        const result = await service.execute({ valor_chave_pix, id_user });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);

    }

}
import { Request, Response } from "express";
import { GetAllKeysPixService } from "../../services/KeyPix/GetAllKeysPixService";


export class GetAllKeysPixController {

    async handle(request: Request, response: Response) {

        const service = new GetAllKeysPixService();

        const result = await service.execute();

        return response.json(result);

    }

}
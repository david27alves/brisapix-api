import { Router, Request, Response } from "express";
import { CreateKeyPixController } from "./controllers/KeyPix/CreateKeyPixController";
import { GetAllKeysPixController } from "./controllers/KeyPix/GetAllKeysPixController";
import { CreateTransactionController } from "./controllers/Transaction/CreateTransactionController";
import { GetAllTransactionsByUserController } from "./controllers/Transaction/GetAllTransactionsByUserController";
import { GetAllTrransactionsController } from "./controllers/Transaction/GetAllTransactionsController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { GetAllUsersController } from "./controllers/User/GetAllUsersController";

import * as KeyPixController from "./controllers/KeyPix/KeyPixController";

const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.get("/users", new GetAllUsersController().handle);

routes.post("/keyspix", KeyPixController.createKeyPix);
routes.get("/keyspix", KeyPixController.getAllKeyPix);

routes.post("/transactions", new CreateTransactionController().handle);
routes.get("/transactions", new GetAllTrransactionsController().handle);
routes.get("/transactions/:id", new GetAllTransactionsByUserController().handle);


export { routes };
import { Router } from "express";

import * as KeyPixController from "./controllers/KeyPix/KeyPixController";
import * as TransactionsController from "./controllers/Transaction/TransactionController";
import * as UserController from "./controllers/User/UserController";

const routes = Router();

routes.post("/users", UserController.createUser);
routes.get("/users", UserController.getAllUsers);

routes.post("/keyspix", KeyPixController.createKeyPix);
routes.get("/keyspix", KeyPixController.getAllKeysPix);
//routes.get("/keyspix/:id", KeyPixController.getKeyPixById);

routes.post("/transactions", TransactionsController.createTransaction);
routes.get("/transactions", TransactionsController.getAllTransactions);
routes.get("/transactions/:id", TransactionsController.getAllTransactionsByUser);


export { routes };
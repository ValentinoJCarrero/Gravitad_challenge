import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRoutes {
    public router: Router;
    public userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/user', this.userController.getUsers);
        this.router.get('/user/api', this.userController.saveUsersFromAPI);
        this.router.post('/user/create', this.userController.createUser);
        this.router.put('/user/:userId', this.userController.updateUser);
        this.router.delete('/user/:userId', this.userController.deleteUser);
    }
}
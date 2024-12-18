import express from 'express';

import { deleteAllUsers, deleteUser, GetAllUsers } from '../Controller/userController.js';

const UserRouter=express.Router();

UserRouter.get('/', GetAllUsers);
UserRouter.delete('/:id',deleteUser);
UserRouter.delete('/',deleteAllUsers);

export default UserRouter;
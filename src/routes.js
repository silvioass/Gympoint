import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import User from './app/models/User';
import Students from './app/models/Students';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import StudentsController from './app/controllers/StudentController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

// routes.get('/', (req, res) => res.json({ message: 'Hello  ddd ss' }));

/*
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Silvio Almeida',
    email: 'silvioass@gmail.com',
    password_hash: '1234567890',
  });

  return res.json(user);
});
*/

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.post('/students', StudentsController.store);
routes.put('/students', StudentsController.update);

export default routes;

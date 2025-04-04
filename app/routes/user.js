const { Router } = require('express');
const userController = require('../ controllers/user');
const AuthService = require('../middlewares/auth');
const multerMiddleware = require('../middlewares/multer');
const route = Router();

route.get('/', userController.index)
route.patch('/:id',  multerMiddleware, userController.updateOneById)

route.post('/', 
    multerMiddleware,
    userController.create
)
route.post('/login', userController.login)
route.delete('/:id', 
    AuthService.getToken, 
    AuthService.decypherToken, 
    userController.deleteOneById
)

module.exports = route


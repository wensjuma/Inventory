const { json } = require("express/lib/response");
const welcome = require("../src/welcome");
const welcomeFile = require('../src/welcome');
const authService = require('../src/services/auth.service');
const productService = require('../src/services/product.Service')

module.exports = (router) =>{
    
    router.post('/login', authService.userLogin);
    router.post('/new-user',authService.createUsers);
    router.get('/products',authService.getSession, productService.listProducts);
}
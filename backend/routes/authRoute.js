const router=require('express').Router();

const {register, login, logout}=require("../controller/authController");
const {authMiddleware} =require("../middleware/authMiddleware")

router.post('/register',register);
router.post('/login',login);
router.post('/logout',authMiddleware,logout);

module.exports=router;
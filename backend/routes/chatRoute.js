
const router=require('express').Router();

const { getRecievers, chatUploadDb, getChat, sendImageChat, messageSeen } = require('../controller/chatControllers');
const { authMiddleware } = require('../middleware/authMiddleware');


router.get('/get-recievers',authMiddleware,getRecievers);
router.post('/send-chat',authMiddleware,chatUploadDb);
router.get('/get-chat/:id',authMiddleware,getChat);
router.post('/send-image-chat',authMiddleware,sendImageChat);

router.post('/seen-message',authMiddleware,messageSeen)




module.exports=router;

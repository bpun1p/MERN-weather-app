const express = require('express');
const { getUserInfo, saveUserInfo } = require('../controllers/userInfoController');
const validateAuth = require('../middleware/validateAuth');

const router = express.Router(); 

router.use(validateAuth)  //validate token before allowing access to routes below

//save user information
router.post('/save', saveUserInfo);

//fetch user inforation
router.get('/get', getUserInfo);

module.exports = router;
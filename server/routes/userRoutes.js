const express = require('express');
const {loginUser, registerUser, updateUser} = require('../controllers/userController');
const validateAuth = require('../middleware/validateAuth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.use(validateAuth)  //validate token before allowing access to routes below

router.patch('/update', updateUser);


module.exports = router;
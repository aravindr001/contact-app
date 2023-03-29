var express = require('express');
const { loginUser,registerUser,currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');
var router = express.Router();

/* GET users listing. */
router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/current',validateToken, currentUser);



module.exports = router;

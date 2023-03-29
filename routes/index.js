var express = require('express');
var router = express.Router();
const {getContact,
  createContact,
  deleteContact,
  getContacts,
  updateContact
} = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

/* GET home page. */

// router.route('/').get(getContacts)
// router.route('/').post()
// router.put((req,res)=>{
//   res.render("index.hbs")
// })
router.use(validateToken)

router.route('/').get(getContacts).post(createContact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)


module.exports = router;

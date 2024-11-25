const { register, login } = require("../controlers/userControler");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);


module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const password = require("../middleware/password");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth, userCtrl.getById);
router.get("/", auth, userCtrl.currentUser);
router.put("/:id", multer, userCtrl.modify);
router.post("/test", auth, userCtrl.test);

module.exports = router;

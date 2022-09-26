const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const authenticateToken = require("../middleware/authenticateToken");

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth, userCtrl.getById);
router.get("/", authenticateToken, userCtrl.currentUser);

module.exports = router;

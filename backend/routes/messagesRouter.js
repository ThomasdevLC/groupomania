const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const messagesController = require("../controllers/messagesController");

router.post("/", auth, multer, messagesController.add);
router.get("/", auth, messagesController.get);
router.get("/:id", messagesController.getById);
router.put("/:id", auth, multer, messagesController.modify);
router.delete("/:id", auth, messagesController.delete);
router.post("/like", auth, messagesController.likes);
router.patch("/comment-post/:id", messagesController.commentPost);
router.patch("/delete-comment-post/:id", messagesController.deleteCommentPost);

module.exports = router;

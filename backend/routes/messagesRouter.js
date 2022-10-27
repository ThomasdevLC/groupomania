const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const messagesController = require("../controllers/messagesController");

router.post("/", auth, multer, messagesController.add);
router.get("/", messagesController.get);
router.get("/:id", messagesController.getById);
router.put("/:id", multer, messagesController.modify);
router.delete("/:id", messagesController.delete);
router.post("/like", messagesController.likes);
router.patch("/comment-post/:id", messagesController.commentPost);
router.patch("/delete-comment-post/:id", messagesController.deleteCommentPost);

// router.post("/:id/like", auth, messagesController.like);

module.exports = router;

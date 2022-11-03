const Message = require("../models/Message");
const fs = require("fs");

exports.add = (req, res, next) => {
  const messageObject = req.body;

  const message = new Message({
    ...messageObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    date: new Date(),
    imageUrl: req.file
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : "",
  });

  message
    .save()
    .then(() => {
      res.status(201).json({ message: "message added !" });
    })
    .catch((error) => {
      res.status(400).json({ message: error });
    });
};

exports.get = (req, res, next) => {
  Message.find()
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(400).json({ message: error }));
};

exports.delete = (req, res, next) => {
  Message.findOne({ _id: req.params.id }).then((message) => {
    if (message.userId == req.auth._id || req.auth.isAdmin) {
      Message.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({ message: "message deleted !" });
        })
        .catch((error) => res.status(401).json({ error }));
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  });
};

exports.modify = (req, res, next) => {
  const messageObject = req.body;
  Message.findOne({ _id: req.params.id })
    .then((message) => {
      if (message.userId == req.auth._id || req.auth.isAdmin) {
        Message.updateOne(
          { _id: req.params.id },
          { ...messageObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "message updated !" }))
          .catch((error) => res.status(401).json({ message: error }));
      } else {
        res.status(401).json({ message: "unauthorized" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.likes = (req, res, next) => {
  const userId = req.auth._id;
  const messageId = req.body.messageId;

  Message.findOne({ _id: messageId }).then((message) => {
    // ADD LIKE
    // user is not in usersLiked array + user clicked on like
    if (!message.usersLiked.includes(userId)) {
      Message.updateOne(
        { _id: messageId },
        {
          $push: { usersLiked: userId },
        }
      ).then(() => {
        Message.findOne({ _id: messageId })
          .then((message) => res.status(200).json(message))
          .catch((error) => res.status(404).json({ message: error }));
      });
    } else {
      // CANCEL LIKE
      // user is in usersLiked array + user clicked on like
      Message.updateOne(
        { _id: messageId },
        {
          $pull: { usersLiked: userId },
        }
      ).then(() => {
        Message.findOne({ _id: messageId })
          .then((message) => res.status(200).json(message))
          .catch((error) => res.status(404).json({ message: error }));
      });
    }
  });
};

exports.commentPost = (req, res) => {
  Message.findOne({ _id: req.params.id }).then((message) => {
    Message.updateOne(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            commenterImage: req.body.commenterImage,
            text: req.body.text,
            timsestamp: new Date().getTime(),
          },
        },
      }
    )
      .then(() => res.status(200).json({ message: "message get comments !" }))
      .catch((error) => res.status(401).json({ message: error }));
  });
};

exports.deleteCommentPost = (req, res) => {
  Message.findOne({ _id: req.params.id }).then((message) => {
    if (message.comments.commenterId == req.auth._id || req.auth.isAdmin) {
      Message.updateOne(
        { _id: req.params.id },
        {
          $pull: {
            comments: {
              _id: req.body.commentId,
            },
          },
        }
      )
        .then(() => res.status(200).json({ message: "comment deleted !" }))
        .catch((error) => res.status(401).json({ message: error }));
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  });
};

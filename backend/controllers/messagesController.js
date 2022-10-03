const Message = require("../models/Message");
const fs = require("fs");

exports.add = (req, res, next) => {
  console.log("messageObject", req.body.title);
  // const messageObject = JSON.parse(req.body.message);
  // delete messageObject._id;
  const messageObject = req.body;

  const message = new Message({
    ...messageObject,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
    date: new Date(),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log("message", message);

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

exports.getById = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ message: error }));
};

exports.delete = (req, res, next) => {
  Message.findOne({ _id: req.params.id }).then((message) => {
    console.log("message", message);
    Message.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "message deleted !" });
      })
      .catch((error) => res.status(401).json({ error }));
  });
};

exports.modify = (req, res, next) => {
  const messageObject = req.body;

  Message.findOne({ _id: req.params.id })
    .then((message) => {
      console.log("message", message);
      Message.updateOne(
        { _id: req.params.id },
        { ...messageObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "message updated !" }))
        .catch((error) => res.status(401).json({ message: error }));
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// exports.like = (req, res, next) => {
//   Message.findOne({ _id: req.params.id }).then((message) => {
//     // ADD LIKE
//     // user is not in usersLiked array + user clicked on like
//     if (!message.usersLiked.includes(req.auth.userId) && req.body.like === 1) {
//       {
//         console.log("User TWO", message.usersLiked);

//         Message.updateOne(
//           { _id: req.params.id },
//           {
//             $inc: { likes: 1 },
//             $push: { usersLiked: req.auth.userId },
//           }
//         )
//           .then(() => {
//             res.status(201).json({ message: "User has liked" });
//           })
//           .catch((error) => res.status(404).json({ message: error }));
//       }
//     }
//     // CANCEL LIKE
//     // user is in usersLiked array + user clicked on like
//     if (message.usersLiked.includes(req.auth.userId) && req.body.like === 0) {
//       Message.updateOne(
//         { _id: req.params.id },
//         {
//           $inc: { likes: -1 },
//           $pull: { usersLiked: req.auth.userId },
//         }
//       )
//         .then(() => {
//           res.status(201).json({ message: "User has cancelled his like" });
//         })
//         .catch((error) => res.status(404).json({ message: error }));
//     }
//     console.log("message Likes", message);
//   });
// };

exports.likes = (req, res, next) => {
  const userId = req.auth.userId;
  const messageId = req.body.messageId;

  Message.findOne({ _id: messageId }).then((message) => {
    console.log("usersLiked", message.usersLiked);
    console.log("userId", userId);

    if (!message.usersLiked.includes(userId)) {
      console.log("ON AJOUTE");
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
      console.log("ON ENLEVE");
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

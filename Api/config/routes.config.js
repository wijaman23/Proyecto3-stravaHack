const express = require("express");
const router = express.Router();
const training = require("../controllers/training.controller");
const user = require("../controllers/user.controller");
const secure = require("../middlewares/secure.mid");
const trainingMid = require("../middlewares/training.mid");
const comments = require("../controllers/comment.controller");
const kudos = require("../controllers/kudos.controller");

router.post("/register", user.register);
router.get("/profile", secure.isAuthenticated, user.profile);
router.post("/login", user.login);
router.delete("/logout", user.logout);
router.get("/users", secure.isAuthenticated, user.list);
router.get("/users/:id", user.detail);
router.patch("/users/:id", user.edit);
router.get("/user/:id/training", secure.isAuthenticated, training.userTraining);

router.post("/training", secure.isAuthenticated, training.create);
router.get("/training", secure.isAuthenticated, training.list);
router.get("/training/:id", secure.isAuthenticated, training.detail);
router.delete(
  "/training/:id",
  secure.isAuthenticated,
  trainingMid.isOwnedByUser,
  training.delete
);

router.post("/training/:id/kudos", secure.isAuthenticated, kudos.kudos);

router.post("/training/:id/comments", secure.isAuthenticated, comments.create);
router.delete(
  "/training/:id/comments/:commentId",
  secure.isAuthenticated,
  trainingMid.isCommentOwnedByUser,
  comments.delete
);

module.exports = router;

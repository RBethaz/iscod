const express = require("express");
const router = express.Router();
const articlesController = require("./articles.controller");
const authMiddleware = require("../auth/auth.middleware");

router.post("/", authMiddleware, articlesController.create);
router.put("/:id", authMiddleware, articlesController.update);
router.delete("/:id", authMiddleware, articlesController.deleteArticle);
router.get("/:userId/articles", usersController.getUserArticles);

module.exports = router;

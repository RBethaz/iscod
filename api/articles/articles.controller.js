const ArticleService = require("./articles.service");
const socket = require("../utils/socket");

const create = async (req, res) => {
  const article = await ArticleService.createArticle({
    ...req.body,
    user: req.user.id,
  });
  socket.emit("articleCreated", article);
  res.status(201).json(article);
};

const update = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Unauthorized");
  const article = await ArticleService.updateArticle(req.params.id, req.body);
  socket.emit("articleUpdated", article);
  res.json(article);
};

const deleteArticle = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send("Unauthorized");
  await ArticleService.deleteArticle(req.params.id);
  socket.emit("articleDeleted", req.params.id);
  res.status(204).send();
};

const getUserArticles = async (req, res) => {
  try {
    const userId = req.params.userId;
    const articles = await ArticleService.getArticlesByUser(userId);
    res.json(articles);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { create, update, deleteArticle, getUserArticles };

const Article = require("./articles.model");

const createArticle = async (articleData) => {
  const article = new Article(articleData);
  return await article.save();
};

const updateArticle = async (id, articleData) => {
  return await Article.findByIdAndUpdate(id, articleData, { new: true });
};

const deleteArticle = async (id) => {
  return await Article.findByIdAndDelete(id);
};

const getArticlesByUser = async (userId) => {
  return await Article.find({ user: userId }).populate("user", "-password");
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByUser,
};

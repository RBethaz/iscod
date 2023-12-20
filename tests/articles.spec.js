const supertest = require("supertest");
const app = require("../server");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.model");

describe("Articles API", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("should create an article", async () => {
    const fakeArticle = {
      title: "Test Article",
      content: "Content",
      user: "someUserId",
    };
    mockingoose(Article).toReturn(fakeArticle, "save");

    const response = await supertest(app)
      .post("/api/articles")
      .send(fakeArticle);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(fakeArticle);
  });

  it("should update an article", async () => {
    const fakeArticle = {
      title: "Updated Article",
      content: "Updated Content",
    };
    const articleId = "someArticleId";
    mockingoose(Article).toReturn(fakeArticle, "findOneAndUpdate");

    const response = await supertest(app)
      .put(`/api/articles/${articleId}`)
      .send(fakeArticle);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(fakeArticle);
  });

  it("should delete an article", async () => {
    const articleId = "someArticleId";
    mockingoose(Article).toReturn(null, "findOneAndDelete");

    const response = await supertest(app).delete(`/api/articles/${articleId}`);
    expect(response.statusCode).toBe(204);
  });
});

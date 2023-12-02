const { News } = require("../../models");
const getAllNews = async () => {
  const news = await News.findAll();
  return news;
}

const getNewsById = async (newsId)  =>{
  const news = await News.findByPk(newsId);
  if (!news) {
    throw Error("News Not Found")
  }
  return news;
}

const addNews = async (newNewsData) => {
  const news = await News.create(newNewsData);
  return news;
}

const editNews = async (newsId, newsData) => {
  const news = await News.update(newsData, {
    where: {
      id: newsId,
    }
  });
  if (!news) {
    throw Error('Failed Update')
  }
  const updated = getNewsById(newsId);
  return updated;
}

const deleteNewsById = async (newsId) => {
  await getNewsById(newsId);
  const news = await News.destroy({
    where: {
      id: newsId
    }
  });
  if (!news) {
    throw Error('Failed Delete')
  }
  return news;
} 

module.exports = {
  getAllNews,
  getNewsById,
  addNews,
  editNews,
  deleteNewsById
}
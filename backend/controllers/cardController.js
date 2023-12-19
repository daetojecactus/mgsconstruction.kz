const { Card, CardImage } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class CardController {
  async createCard(req, res, next) {
    try {
      console.log("Received createCard request:", req.body);
      const { title, projectId } = req.body;
      // const images = req.files.images; // Assuming "images" is an array of image files
      // ...

      const images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];

      console.log("Received images:", images);

      // Create an array to store image URLs
      const imgUrls = [];

      for (const image of images) {
        const fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName));
        imgUrls.push(fileName);
      }

      console.log("Image URLs:", imgUrls);

      const newCard = await Card.create({
        title,
        projectId,
        images: imgUrls, // Save image file paths
      });

      console.log("New card created:", newCard);

      return res.json(newCard);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // async getAllCards(req, res, next) {
  //   try {
  //     console.log("Received getAllCards request");
  //     const cards = await Card.findAll();
  //     console.log("Fetched all cards:", cards);
  //     return res.json(cards);
  //   } catch (e) {
  //     next(ApiError.internal(e.message));
  //   }
  // }


  async getAllCards(req, res, next) {
    try {
      const { projectId } = req.query;
      console.log("Received getAllCards request for projectId:", projectId);
  
      let cards;
  
      if (projectId) {
        // If projectId is provided, filter cards by projectId
        cards = await Card.findAll({
          where: { projectId },
          include: [{ model: CardImage, as: 'cardImages' }],
        });
      } else {
        // If projectId is not provided, get all cards
        cards = await Card.findAll({
          include: [{ model: CardImage, as: 'cardImages' }],
        });
      }
  
      console.log("Fetched all cards:", cards);
      return res.json(cards);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }
  
  
  



  async getOneCard(req, res, next) {
    try {
      const { id } = req.params;
      console.log("Received getOneCard request for ID:", id);
      const card = await Card.findByPk(id, {
        include: [CardImage], // Include associated images
      });

      console.log("Fetched card:", card);

      if (!card) {
        throw ApiError.notFound("Карточка не найдена");
      }

      return res.json(card);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async deleteCard(req, res, next) {
    try {
      const { id } = req.params;
      console.log("Received deleteCard request for ID:", id);

      const existingCard = await Card.findByPk(id);

      console.log("Existing card:", existingCard);

      if (!existingCard) {
        return next(ApiError.notFound("Карточка не найдена"));
      }

      await Card.destroy({
        where: { id },
      });

      console.log("Card deleted");

      return res.json({ message: "Карточка удалена" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
  async updateCard(req, res, next) {
    try {
      const { id } = req.params;
      console.log("Received updateCard request for ID:", id);
      console.log("Request body:", req.body);

      const { title, images } = req.body;

      const existingCard = await Card.findByPk(id);

      console.log("Existing card:", existingCard);

      if (!existingCard) {
        return next(ApiError.notFound("Карточка не найдена"));
      }

      // Update the card fields
      existingCard.title = title;

      // If there are new images, update the images
      if (images) {
        const imageArray = Array.isArray(images) ? images : [images];

        // Save new image file paths
        const imgUrls = [];
        for (const image of imageArray) {
          // Проверьте, что image - это файл, прежде чем использовать метод .mv
          if (
            image &&
            typeof image === "object" &&
            typeof image.mv === "function"
          ) {
            const fileName = uuid.v4() + ".jpg";
            image.mv(path.resolve(__dirname, "..", "static", fileName));
            imgUrls.push(fileName);
          }
        }

        existingCard.images = imgUrls;
      }

      console.log("Updated card:", existingCard);

      await existingCard.save(); // Save the updated card

      return res.json(existingCard);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  

  async getCardsByProjectId(req, res, next) {
    try {
      const { projectId } = req.query; // Получаем projectId из параметра запроса
      console.log("Received getCardsByProjectId request for projectId:", projectId);

      const cards = await Card.findAll({
        where: { projectId: projectId }, // Фильтруем карточки по projectId
        include: [CardImage], // Включаем ассоциированные изображения
      });

      console.log("Fetched cards by projectId:", cards);

      return res.json(cards);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

}

module.exports = new CardController();

const { SocialLink } = require("../models/models");
const ApiError = require("../error/ApiError");

class SocialLinkController {
  async createSocialLink(req, res, next) {
    try {
      const { platform, url } = req.body;
      const socialLink = await SocialLink.create({
        platform,
        url,
      });
      return res.json(socialLink);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllSocialLinks(req, res, next) {
    try {
      const links = await SocialLink.findAll();
      return res.json(links);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOneSocialLink(req, res, next) {
    try {
      const { id } = req.params;
      const link = await SocialLink.findByPk(id);
      if (!link) {
        throw ApiError.notFound("Социальная ссылка не найдена");
      }
      return res.json(link);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async updateSocialLink(req, res, next) {
    try {
      const { id } = req.params;
      const { platform, url } = req.body;

      const socialLink = await SocialLink.findByPk(id);

      if (!socialLink) {
        return next(ApiError.notFound("Соц сеть не найдена"));
      }

      // Обновляем поля соц сети
      socialLink.platform = platform;
      socialLink.url = url;

      await socialLink.save(); // Сохраняем обновленную соц сеть

      return res.json(socialLink);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // Удаление соц сети
  async deleteSocialLink(req, res, next) {
    try {
      const { id } = req.params;

      const socialLink = await SocialLink.findByPk(id);

      if (!socialLink) {
        return next(ApiError.notFound("Соц сеть не найдена"));
      }

      await SocialLink.destroy({
        where: { id },
      });

      return res.json({ message: "Соц сеть удалена" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new SocialLinkController();

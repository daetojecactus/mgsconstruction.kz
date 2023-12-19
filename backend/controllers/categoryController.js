const { ProjectCategory } = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const { category } = req.body;
      console.log("Updated category data:", category);
      const newCategory = await ProjectCategory.create({
        category,
      });
      console.log('newCategory', newCategory)
      console.log('newCategory.id', newCategory.id)
      console.log('newCategoryCategoryId', newCategory.categoryId)
      return res.json(newCategory);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllCategories(req, res, next) {
    try {
      const categories = await ProjectCategory.findAll();
      return res.json(categories);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async getOneCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await ProjectCategory.findByPk(id);
      if (!category) {
        throw ApiError.notFound("Категория не найдена");
      }
      return res.json(category);
    } catch (e) {
      next(ApiError.internal(e.message));
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { category } = req.body;
      console.log("Received PUT request to update category with id", id);
      console.log("Updated category data:", category);
  
      // Добавьте лог для проверки типа id
      console.log("Type of id:", typeof id);
  
      const existingCategory = await ProjectCategory.findByPk(id);
  
      if (!existingCategory) {
        return next(ApiError.notFound("Категория не найдена"));
      }
  
      // Добавьте лог для проверки типа существующей категории
      console.log("Type of existingCategory:", typeof existingCategory);

      console.log('existingCategory', existingCategory)
  
      // Update the category fields
      existingCategory.category = category;
  
      await existingCategory.save(); // Save the updated category
  
      console.log("Category successfully updated:", existingCategory);
  
      return res.json(existingCategory);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      const existingCategory = await ProjectCategory.findByPk(id);

      if (!existingCategory) {
        return next(ApiError.notFound("Категория не найдена"));
      }

      await ProjectCategory.destroy({
        where: { id },
      });

      return res.json({ message: "Категория удалена" });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new CategoryController();

const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getOneCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;

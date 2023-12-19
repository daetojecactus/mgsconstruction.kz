const Router = require("express");
const router = new Router();
const projectController = require("../controllers/projectController");

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getOneProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;

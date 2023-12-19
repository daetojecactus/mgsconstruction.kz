const Router = require("express");
const router = new Router();
const cardController = require("../controllers/cardController");

router.post("/", cardController.createCard);
router.put("/:id", cardController.updateCard);
router.get("/", cardController.getAllCards);
router.get("/:id", cardController.getOneCard);
router.delete("/:id", cardController.deleteCard);

// Новый маршрут для получения карточек по projectId
router.get("/byProjectId", cardController.getCardsByProjectId);

module.exports = router;

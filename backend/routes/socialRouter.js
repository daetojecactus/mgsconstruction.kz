const Router = require("express");
const router = new Router();
const socialLinkController = require("../controllers/socialLinkController");

router.post("/", socialLinkController.createSocialLink);
router.put("/:id", socialLinkController.updateSocialLink);
router.get("/", socialLinkController.getAllSocialLinks);
router.get("/:id", socialLinkController.getOneSocialLink);
router.delete("/:id", socialLinkController.deleteSocialLink);

module.exports = router;

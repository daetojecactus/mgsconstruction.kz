const Router = require("express");
const router = new Router();
const projectRouter = require("./projectRouter");
const userRouter = require("./userRouter");
const cardRouter = require("./cardRouter");
const socialRouter = require("./socialRouter");
const categoryRouter = require("./categoryRouter");

router.use("/user", userRouter);
router.use("/project", projectRouter);
router.use("/card", cardRouter);
router.use("/social-link", socialRouter);
router.use("/category", categoryRouter);

module.exports = router;

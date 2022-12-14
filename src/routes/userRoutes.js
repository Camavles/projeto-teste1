const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController")

const { checkAuth } = require("../middlewares/auth");

//rotas de users
router.get("/all", checkAuth, userController.getAll);
router.post("/create", userController.createUser);
router.post("/login", authController.login);
router.delete("/delete/:id", checkAuth, userController.deleteUser);

module.exports = router;
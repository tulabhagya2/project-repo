const express = require("express");
const _route = express.Router();

const { getStatement, sendMoney } = require("../controllers/accountController");
const authMiddleware=require("../middlewares/authMiddleware")
_route.post("/signup", signup);
_route.post("/login", login);

module.exports = { signup, login }
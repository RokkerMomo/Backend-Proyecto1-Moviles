"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_contoller_1 = require("../controllers/user.contoller");
router.post('/signup', user_contoller_1.signUp);
router.post('/signin', user_contoller_1.signIn);
exports.default = router;

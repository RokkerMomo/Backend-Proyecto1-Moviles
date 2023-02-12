"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const user_contoller_1 = require("../controllers/user.contoller");
const notas_controller_1 = require("../controllers/notas.controller");
const carpetas_controller_1 = require("../controllers/carpetas.controller");
//endpoints para users
router.post('/signup', user_contoller_1.signUp);
router.post('/signin', user_contoller_1.signIn);
router.post('/finduser', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.FindUser);
router.post('/deleteuser', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.deleteUser);
router.post('/edituser', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.edituser);
router.post('/editpass', passport_1.default.authenticate('jwt', { session: false }), user_contoller_1.editpassword);
//enpoints para notes
router.post('/newnote', passport_1.default.authenticate('jwt', { session: false }), notas_controller_1.newNote);
router.post('/shownotes', passport_1.default.authenticate('jwt', { session: false }), notas_controller_1.showNotes);
router.post('/showdetails', passport_1.default.authenticate('jwt', { session: false }), notas_controller_1.showDetails);
router.post('/edit', passport_1.default.authenticate('jwt', { session: false }), notas_controller_1.editContent);
router.post('/delete', passport_1.default.authenticate('jwt', { session: false }), notas_controller_1.deleteNote);
router.post('/addnote', passport_1.default.authenticate('jwt', { session: false }), notas_controller_1.AddtoColecction);
router.post('/showcarpet', passport_1.default.authenticate('jwt', { session: false }), notas_controller_1.shownotesinacollection);
//enpoints para carpetas
router.post('/newcarpet', passport_1.default.authenticate('jwt', { session: false }), carpetas_controller_1.newCarpeta);
router.post('/showcolecction', passport_1.default.authenticate('jwt', { session: false }), carpetas_controller_1.showcolecction);
router.post('/deletecollection', passport_1.default.authenticate('jwt', { session: false }), carpetas_controller_1.deletecollection);
exports.default = router;

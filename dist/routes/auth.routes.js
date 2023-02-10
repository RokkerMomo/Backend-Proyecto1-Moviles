"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_contoller_1 = require("../controllers/user.contoller");
const notas_controller_1 = require("../controllers/notas.controller");
const carpetas_controller_1 = require("../controllers/carpetas.controller");
//endpoints para users
router.post('/signup', user_contoller_1.signUp);
router.post('/signin', user_contoller_1.signIn);
router.post('/finduser', user_contoller_1.FindUser);
router.post('/deleteuser', user_contoller_1.deleteUser);
//enpoints para notes
router.post('/newnote', notas_controller_1.newNote);
router.post('/shownotes', notas_controller_1.showNotes);
router.post('/showdetails', notas_controller_1.showDetails);
router.post('/edit', notas_controller_1.editContent);
router.post('/delete', notas_controller_1.deleteNote);
router.post('/addnote', notas_controller_1.AddtoColecction);
router.post('/showcarpet', notas_controller_1.shownotesinacollection);
//enpoints para carpetas
router.post('/newcarpet', carpetas_controller_1.newCarpeta);
router.post('/showcolecction', carpetas_controller_1.showcolecction);
exports.default = router;

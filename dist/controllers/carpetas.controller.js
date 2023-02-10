"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showcolecction = exports.newCarpeta = void 0;
const carpetas_1 = __importDefault(require("../models/carpetas"));
//Crear coleccion
const newCarpeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Guardar coleccion
    const newcarpet = new carpetas_1.default(req.body);
    yield newcarpet.save();
    return res.status(201).json(newcarpet);
});
exports.newCarpeta = newCarpeta;
const showcolecction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carpetas = yield carpetas_1.default.find({ owner: req.body.owner });
    if (!carpetas) {
        return res.status(400).json({ msg: "el usuario no existe" });
    }
    return res.status(201).json(carpetas);
});
exports.showcolecction = showcolecction;

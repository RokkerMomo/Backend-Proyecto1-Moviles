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
exports.deleteNote = exports.editContent = exports.showDetails = exports.showNotes = exports.newNote = void 0;
const notas_1 = __importDefault(require("../models/notas"));
//Crear Nota
const newNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //GUARDAR Nota
    const newnota = new notas_1.default(req.body);
    yield newnota.save();
    return res.status(201).json(newnota);
});
exports.newNote = newNote;
const showNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notas = yield notas_1.default.find({ owner: req.body.owner });
    console.log(notas);
    return res.status(201).json(notas);
});
exports.showNotes = showNotes;
const showDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nota = yield notas_1.default.findOne({ _id: req.body._id });
    if (!nota) {
        return res.status(400).json({ msg: 'La nota que busco no existe' });
    }
    //GUARDAR USUARIO
    return res.status(201).json(nota);
});
exports.showDetails = showDetails;
const editContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notas = yield notas_1.default.updateOne({ _id: req.body._id }, { titulo: req.body.titulo, descripcion: req.body.descripcion });
    console.log(notas);
    return res.status(201).json({ msg: "Guardado con exito" });
});
exports.editContent = editContent;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nota = yield notas_1.default.findOne({ _id: req.body._id });
    if (!nota) {
        return res.status(400).json({ msg: 'La nota que busco no existe' });
    }
    const notas = yield notas_1.default.deleteOne({ _id: req.body._id });
    console.log(notas);
    return res.status(201).json({ msg: "Nota eliminada con exito" });
});
exports.deleteNote = deleteNote;

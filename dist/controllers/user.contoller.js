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
exports.deleteUser = exports.FindUser = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const notas_1 = __importDefault(require("../models/notas"));
//FUNCION PARA CREAR TOKEN
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, usuario: user.usuario }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
}
//REGISTRO
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.usuario || !req.body.password) {
        return res.status(400).json({ msg: 'Asegurese de ingresar el usuario y la contraseña' });
    }
    const user = yield user_1.default.findOne({ usuario: req.body.usuario });
    if (user) {
        return res.status(400).json({ msg: 'El Usuario que ingreso ya existe' });
    }
    //GUARDAR USUARIO
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
//LOGIN
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.usuario || !req.body.password) {
        return res.status(400).json({ msg: "Asegurese de ingresar el usuario y la contraseña" });
    }
    const user = yield user_1.default.findOne({ usuario: req.body.usuario });
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (!isMatch) {
        //DEVOLVER RESPUETA
        return res.status(400).json({ msg: "El correo o la contraseña son incorrectos" });
    }
    //DEVOLVER TOKEN
    //  user.push({token:createToken(user)})
    return res.status(201).json({ user, token: createToken(user) });
});
exports.signIn = signIn;
const FindUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.body._id });
    console.log(req.body);
    if (!user) {
        return res.status(400).json({ msg: "El usuario no existe" });
    }
    return res.status(200).json(user);
});
exports.FindUser = FindUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ _id: req.body._id });
    if (!user) {
        return res.status(400).json({ msg: 'el usuario que busco no existe' });
    }
    yield user_1.default.deleteOne({ _id: req.body._id });
    yield notas_1.default.deleteMany({ owner: req.body._id });
    return res.status(201).json({ msg: "Cuenta eliminada con exito" });
});
exports.deleteUser = deleteUser;

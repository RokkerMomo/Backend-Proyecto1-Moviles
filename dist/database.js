"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
mongoose_1.default.connect(config_1.default.DB.URI);
const conection = mongoose_1.default.connection;
conection.once('open', () => {
    console.log('Conecxion Exisota con la base de datos');
});
conection.on('error', err => {
    //console.log(err);
    process.exit(0);
});

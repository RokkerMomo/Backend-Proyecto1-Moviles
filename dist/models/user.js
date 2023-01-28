"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        require: true
    },
    rol: {
        type: String,
        require: true
    },
});
exports.default = (0, mongoose_1.model)('usuario', UserSchema);

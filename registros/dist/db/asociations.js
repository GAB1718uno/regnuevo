"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fallecido_1 = __importDefault(require("../models/fallecido"));
const sepultura_1 = __importDefault(require("../models/sepultura"));
fallecido_1.default.hasOne(sepultura_1.default);
fallecido_1.default.belongsTo(sepultura_1.default);
//# sourceMappingURL=asociations.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.today = void 0;
exports.isNumber = isNumber;
const dayjs_1 = __importDefault(require("dayjs"));
function isNumber(value) {
    const num = Number(value); // Intenta convertir el valor a número
    return Number.isInteger(num); // Devuelve true si es un número entero, false si no lo es
}
const today = () => (0, dayjs_1.default)().format("DD/MM/YYYY");
exports.today = today;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("./winston");
const custom_1 = __importDefault(require("./custom"));
let logger;
if (process.env.NODE_ENV === "localhost") {
    logger = winston_1.logger;
}
else {
    logger = custom_1.default;
}
exports.default = logger;
//# sourceMappingURL=index.js.map
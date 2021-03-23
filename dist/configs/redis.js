"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient({
    url: "redis://:pf60ac1a3449bbde58ee3b7bd4cc9479eb43df04fffa63f72716182c14ce906d0@ec2-54-80-162-199.compute-1.amazonaws.com:23209",
});
exports.default = client;
//# sourceMappingURL=redis.js.map
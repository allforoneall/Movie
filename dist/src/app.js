"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieRoutes_1 = __importDefault(require("../routes/movieRoutes"));
const reviewRoutes_1 = __importDefault(require("../routes/reviewRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/movies', movieRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
exports.default = app;

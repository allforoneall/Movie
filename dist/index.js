"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 27017;
//@ts-ignore
const MONGO_URI = process.env.MONGO_URI;
mongoose_1.default
    //@ts-ignore
    .connect(MONGO_URI) // No need for useNewUrlParser and useUnifiedTopology options
    .then(() => {
    console.log('MongoDB connected');
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Database connection error:', err);
});

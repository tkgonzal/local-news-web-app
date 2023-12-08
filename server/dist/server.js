"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = __importStar(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const passwordResetRoute_1 = __importDefault(require("./routes/passwordResetRoute"));
const confirmResetPassword_1 = __importDefault(require("./routes/confirmResetPassword"));
const business_1 = __importDefault(require("./routes/business"));
const articleRoute_1 = __importDefault(require("./routes/articleRoute"));
const articlesRoute_1 = __importDefault(require("./routes/articlesRoute"));
const subscription_1 = __importDefault(require("./routes/subscription"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.get('/', (req: Request, res: Response) => {
//     res.send('API is running SMOOOOOTHLY');
// });
// Login/Authentication Endpoints
app.use('/api/auth', authRoute_1.default);
app.use('/api/request-password-reset', passwordResetRoute_1.default);
app.use('/api/confirm-password-reset', confirmResetPassword_1.default);
// User Endpoints
app.use('/api/users', userRoute_1.default);
// Business Endpoints
app.use("/api/business", authRoute_1.authenticateToken, business_1.default);
// Article endpoints
app.use('/api/article', articleRoute_1.default);
app.use('/api/articles', articlesRoute_1.default);
// Subscriptions endpoints
app.use("/api/subscriptions", authRoute_1.authenticateToken, subscription_1.default);
app.listen(PORT, () => {
    console.log(`Local news web app server starting on port ${PORT}`);
});

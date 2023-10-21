"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const bot_1 = __importDefault(require("./routes/bot"));
const feedback_1 = __importDefault(require("./routes/feedback"));
const index_1 = __importDefault(require("./routes/index"));
const payment_1 = __importDefault(require("./routes/payment"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    allowedHeaders: "*"
}));
app.use(express_1.default.json());
app.use('/', index_1.default);
app.use('/feedback', feedback_1.default);
app.use('/payment', payment_1.default);
app.use('/bot', bot_1.default);
app.listen(process.env.PORT, () => {
    console.log('server started at port : ', process.env.PORT);
});
exports.default = app;
//# sourceMappingURL=index.js.map
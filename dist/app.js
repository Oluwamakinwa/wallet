"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const wallet = require("./controllers/wallet");
const transaction = require("./controllers/transaction");
const bodyParser = require("body-parser");
const dbFunctions = require("./db");
const jwtController = require("./controllers/jwtcontroller");
const middleware = require("./middleware");
const exchange = require("./controllers/exchangeController");
const app = express();
app.set("port", 3000);
app.use(bodyParser.json());
dbFunctions.initialise();
app.get("/transactions", transaction.transactions);
app.get("/transaction/:id/", transaction.getTransaction);
app.post("/transaction", middleware.verifyToken, transaction.addTransaction);
app.delete("/transaction/:id", middleware.verifyToken, transaction.delTransaction);
app.put("/transaction/:id/:execute*?", middleware.verifyToken, transaction.updateTransaction);
app.get("/wallets", wallet.wallets);
app.get("/wallet/:id/:transactions*?", wallet.getWallet);
app.post("/wallet", middleware.verifyToken, wallet.addWallet);
app.delete("/wallet/:id", middleware.verifyToken, wallet.delWallet);
app.put("/wallet/:id", middleware.verifyToken, wallet.updateWallet);
app.get("/getToken", jwtController.genToken);
app.get("/exchange", exchange.getRates);
app.get('/api', (req, res) => {
    res.json({
        message: 'Wallet API Online'
    });
});
//app.post('api/posts/',(req, res) =>)
app.listen(app.get("port"), () => {
    console.log("server running on portals %d", app.get("port"));
});

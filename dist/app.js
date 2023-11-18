"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 5000;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
console.log(process.cwd());
exports.default = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
var axios_1 = require("axios");
var API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
var api = axios_1.default.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
exports.api = api;
api.interceptors.request.use(function (config) {
    var token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
});
exports.default = api;

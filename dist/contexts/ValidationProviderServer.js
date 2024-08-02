"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationProviderServer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ValidationContext_1 = require("./ValidationContext");
const ValidationProviderServer = ({ children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(ValidationContext_1.ValidationProvider, { ...props, children: children }));
};
exports.ValidationProviderServer = ValidationProviderServer;

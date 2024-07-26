"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DndProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
const react_dnd_1 = require("react-dnd");
const DndProvider = ({ children }) => {
    const windowIsDefined = typeof window !== 'undefined' ? window : {};
    return ((0, jsx_runtime_1.jsx)(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend, context: windowIsDefined, children: children }));
};
exports.DndProvider = DndProvider;

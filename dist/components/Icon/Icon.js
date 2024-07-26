"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function Icon(props) {
    const { name, size, variant, className, ...iconProps } = props;
    let result = `bi bi-${name}`;
    if (size) {
        result = result.concat(` fs-${size}`);
    }
    if (variant) {
        result = result.concat(` text-${variant}`);
    }
    if (className) {
        result = result.concat(` ${className}`);
    }
    return ((0, jsx_runtime_1.jsx)("i", { className: result, ...iconProps }));
}
exports.Icon = Icon;

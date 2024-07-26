"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chip = Chip;
const jsx_runtime_1 = require("react/jsx-runtime");
function Chip(props) {
    const { style: outerStyle, children, ...otherProps } = props;
    const style = {
        padding: '0 0.5rem',
        borderWidth: '0.075rem',
        borderStyle: 'solid',
        borderRadius: '0.375rem',
        verticalAlign: 'middle',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        width: 'fit-content',
        ...outerStyle
    };
    return (0, jsx_runtime_1.jsx)("span", { style: style, ...otherProps, children: children });
}

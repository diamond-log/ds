"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
function Option(props) {
    const classes = props.classes || {
        div: "",
        initial: 'bg-white',
        hover: 'bg-gray-200'
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: classes.div, onClick: props.onClick, style: {
            cursor: 'pointer',
            padding: '0.25rem 1rem',
            userSelect: 'none',
            msUserSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none'
        }, onMouseLeave: function (e) { e.currentTarget.className = classes.initial; }, onMouseOver: function (e) { e.currentTarget.className = classes.hover; }, children: props.children }));
}
exports.Option = Option;

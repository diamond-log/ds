"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = Option;
const jsx_runtime_1 = require("react/jsx-runtime");
function Option(props) {
    const className = {
        initial: 'bg-white',
        hover: 'bg-cedar-primary text-white'
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: className.common, onClick: props.onClick, style: {
            cursor: 'pointer',
            padding: '0.25rem 1rem',
            userSelect: 'none',
            msUserSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none'
        }, onMouseLeave: function (e) { e.currentTarget.className = className.initial; }, onMouseOver: function (e) { e.currentTarget.className = className.hover; }, children: props.children }));
}

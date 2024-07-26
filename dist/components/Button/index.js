"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = __importDefault(require("react-bootstrap/Button"));
const idToIndex_1 = require("../../utils/idToIndex");
const Button = ({ dictionary, intltextposition, as, ...props }) => {
    const intlText = dictionary?.[(0, idToIndex_1.idToIndex)(props.id)];
    const children = (() => {
        if (props?.children && intlText) {
            return intltextposition === "right"
                ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.children, (0, jsx_runtime_1.jsx)("label", { className: "user-select-none cursor-pointer", children: intlText })] })
                :
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("label", { className: "user-select-none cursor-pointer", children: intlText }), props.children] });
        }
        if (props?.children)
            return props.children;
        return intlText;
    })();
    return ((0, jsx_runtime_1.jsx)(Button_1.default, { ...props, children: children }));
};
exports.Button = Button;

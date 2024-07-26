"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const FormSelect_1 = __importDefault(require("react-bootstrap/FormSelect"));
const idToIndex_1 = require("../../utils/idToIndex");
const react_1 = require("react");
const useValidation_1 = require("../../hooks/useValidation");
exports.Select = (0, react_1.forwardRef)(({ dictionary, labelId, labelClassName, ...props }, ref) => {
    const { className, ErrorMessage } = (0, useValidation_1.useValidation)(props.name);
    props = { ...props, className: `${className} ${props.className || ""}` };
    const SelectElement = (0, jsx_runtime_1.jsx)(FormSelect_1.default, { ...props, ref: ref });
    if (labelId)
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-100 d-flex flex-column gap-1 p-0", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: props.id, className: labelClassName + (props?.required ? ' isRequired' : ''), children: dictionary?.[(0, idToIndex_1.idToIndex)(labelId)] || '' }), SelectElement, (0, jsx_runtime_1.jsx)(ErrorMessage, {})] }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [SelectElement, (0, jsx_runtime_1.jsx)(ErrorMessage, {})] }));
});

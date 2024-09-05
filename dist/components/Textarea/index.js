"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const FormControl_1 = __importDefault(require("react-bootstrap/FormControl"));
const idToIndex_1 = require("../../utils/idToIndex");
const react_1 = require("react");
const ValidationContext_1 = require("../../contexts/ValidationContext");
exports.Textarea = (0, react_1.forwardRef)(({ dictionary, as, labelId, labelClassName, autoResize, ...props }, ref) => {
    const intlText = dictionary?.[(0, idToIndex_1.idToIndex)(props.id)];
    const placeholder = props?.placeholder || intlText;
    const { className } = (0, ValidationContext_1.useValidation)();
    props = { ...props, className: `${className} ${props.className || ""}` };
    function autoGrow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }
    const TextareaElement = ((0, jsx_runtime_1.jsx)(FormControl_1.default, { ...props, as: "textarea", placeholder: placeholder, rows: 8, ref: ref }));
    if (labelId)
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-100 d-flex flex-column gap-1 p-0", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: props.id, className: labelClassName + (props?.required ? ' isRequired' : ''), children: dictionary?.[(0, idToIndex_1.idToIndex)(labelId)] || '' }), TextareaElement] }));
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: TextareaElement }));
});

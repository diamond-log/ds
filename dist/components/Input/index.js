"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const FormControl_1 = __importDefault(require("react-bootstrap/FormControl"));
const react_1 = require("react");
const idToIndex_1 = require("../../utils/idToIndex");
const Icon_1 = require("../Icon");
const ValidationContext_1 = require("../../contexts/ValidationContext");
exports.Input = (0, react_1.forwardRef)(({ dictionary, togglePasswordVisibility, alert, labelId, labelClassName, icon, ...props }, ref) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const intlText = dictionary?.[(0, idToIndex_1.idToIndex)(props.id)];
    const placeholder = props?.placeholder || intlText;
    const { className } = (0, ValidationContext_1.useValidation)();
    props = { ...props, className: `${className} ${props.className || ""}` };
    function toggleVisibility() {
        setVisible(!visible);
    }
    const AlertComponent = (() => {
        if (!alert)
            return null;
        props.className = `${props.className} border border-${alert.type}`;
        return (typeof alert.message === "string"
            ? ((0, jsx_runtime_1.jsx)("p", { className: `text-${alert.type}`, children: alert.message }))
            : alert.message || null);
    })();
    const alertIcon = {
        success: "check-lg",
        warning: "exclamation-triangle",
        danger: "exclamation-circle"
    };
    const LabelComponent = (labelId
        ? ((0, jsx_runtime_1.jsx)("label", { htmlFor: props.id, className: labelClassName + (props?.required ? ' isRequired' : ''), children: dictionary?.[(0, idToIndex_1.idToIndex)(labelId)] || '' }))
        : null);
    let InputComponent;
    if (togglePasswordVisibility && props.type === "password") {
        InputComponent = ((0, jsx_runtime_1.jsxs)("span", { className: "d-flex position-relative align-items-center w-100", children: [(0, jsx_runtime_1.jsx)(FormControl_1.default, { ...props, type: visible ? "text" : "password", placeholder: placeholder, ref: ref }), visible
                    ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "eye", role: "button", className: "position-absolute end-0 me-2", onClick: () => toggleVisibility() })
                    : (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "eye-slash", role: "button", className: "position-absolute end-0 me-2", onClick: () => toggleVisibility() }), alert && ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: alertIcon[alert.type], style: { right: 25 }, className: `position-absolute me-2 pe-none`, variant: alert.type }))] }));
    }
    else if (alert) {
        InputComponent = ((0, jsx_runtime_1.jsxs)("span", { className: "d-flex position-relative align-items-center w-100 p-0", children: [(0, jsx_runtime_1.jsx)(FormControl_1.default, { ...props, placeholder: placeholder, ref: ref }), (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: alertIcon[alert.type], className: `position-absolute me-2 pe-none ${togglePasswordVisibility ? "end-2" : "end-0"}`, variant: alert.type })] }));
    }
    else {
        InputComponent = ((0, jsx_runtime_1.jsxs)("span", { className: "d-flex position-relative align-items-center w-100 p-0", children: [(0, jsx_runtime_1.jsx)(FormControl_1.default, { ...props, className: (icon ? "icon " : "") + (props.className || ""), placeholder: placeholder, ref: ref }), (0, jsx_runtime_1.jsx)("span", { className: `position-absolute me-2 end-0`, children: icon })] }));
    }
    return (AlertComponent
        ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: alert?.containerClassName || "w-100 d-flex flex-column gap-1 p-0", children: [LabelComponent, InputComponent, AlertComponent] }) })) :
        labelId ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "w-100 d-flex flex-column gap-1 p-0", children: [LabelComponent, InputComponent] }) }))
            : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: InputComponent })));
});

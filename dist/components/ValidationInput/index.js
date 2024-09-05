"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const FormContext_1 = require("../../contexts/FormContext");
const ValidationInput = ({ field, registerOptions }) => {
    const useDSFormHook = (0, FormContext_1.useForm)();
    const useReactHookFormContext = (0, react_hook_form_1.useFormContext)();
    const useReactHookForm = (0, react_hook_form_1.useForm)();
    const form = (useDSFormHook?.control ? useDSFormHook :
        useReactHookFormContext?.control ? useReactHookFormContext :
            useReactHookForm);
    return ((0, jsx_runtime_1.jsx)("input", { className: "input-validation", style: {
            display: 'none',
            visibility: 'hidden',
            position: 'absolute',
            pointerEvents: 'none',
            opacity: 0,
            height: 0,
            width: 0
        }, ...form.register(field, registerOptions) }));
};
exports.ValidationInput = ValidationInput;

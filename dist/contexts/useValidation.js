"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const FormContext_1 = require("./FormContext");
const useValidation = ({ field, errorMessageProps, registerOptions }) => {
    const dsFormHook = (0, FormContext_1.useForm)();
    const reactHookForm = (0, react_hook_form_1.useFormContext)();
    const form = (dsFormHook || reactHookForm);
    const useFormState = form?.control ? react_hook_form_1.useFormState : (() => { });
    const formState = useFormState({ control: form ? form?.control : undefined, name: field });
    const errors = formState?.errors;
    const value = field ? form?.getValues?.(field) : "";
    const className = field && errors[field]
        ? "is-invalid"
        : value
            ? "" // ? "is-valid"
            : "";
    return {
        className,
        ErrorMessage: (errors?.[field]?.message ? ((0, jsx_runtime_1.jsx)("small", { ...errorMessageProps, className: `${errorMessageProps?.className || "text-danger"}`, children: (errors?.[field]?.message) })) : null),
        ValidationInput: (registerOptions ? ((0, jsx_runtime_1.jsx)("input", { className: "input-validation", style: {
                display: 'none',
                visibility: 'hidden',
                position: 'absolute',
                pointerEvents: 'none',
                opacity: 0,
                height: 0,
                width: 0
            }, ...form.register(field, registerOptions) })) : null)
    };
};
exports.useValidation = useValidation;

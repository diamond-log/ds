"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = exports.ValidationContext = void 0;
exports.ValidationProvider = ValidationProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const FormContext_1 = require("./FormContext");
const react_1 = require("react");
exports.ValidationContext = (0, react_1.createContext)({ className: "" });
// export function useValidation< M extends FieldValues, R extends UseFormReturn<M> >(field: keyof M, useFormContext?: () => R) {
const useValidation = () => (0, react_1.useContext)(exports.ValidationContext);
exports.useValidation = useValidation;
function ValidationProvider({ children, field, errorMessageProps }) {
    const dsFormHook = (0, FormContext_1.useForm)();
    const reactHookForm = (0, react_hook_form_1.useFormContext)();
    const form = (dsFormHook || reactHookForm);
    const useState = form?.control ? react_hook_form_1.useFormState : (() => { });
    const formState = useState({ control: form ? form?.control : undefined, name: field });
    const errors = formState?.errors;
    const value = field ? form?.getValues?.(field) : "";
    const className = field && errors[field]
        ? "is-invalid"
        : value
            ? "" // ? "is-valid"
            : "";
    if (!field)
        return children;
    return ((0, jsx_runtime_1.jsxs)(exports.ValidationContext.Provider, { value: { className }, children: [children, errors?.[field]?.message && ((0, jsx_runtime_1.jsx)("small", { ...errorMessageProps, className: `${errorMessageProps?.className || "text-danger"}`, children: (errors?.[field]?.message) }))] }));
}

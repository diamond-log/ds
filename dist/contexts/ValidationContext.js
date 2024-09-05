"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = exports.ValidationContext = void 0;
exports.ValidationProvider = ValidationProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const FormContext_1 = require("./FormContext");
const react_1 = require("react");
const error_message_1 = require("@hookform/error-message");
exports.ValidationContext = (0, react_1.createContext)({ className: "" });
// export function useValidation< M extends FieldValues, R extends UseFormReturn<M> >(field: keyof M, useFormContext?: () => R) {
const useValidation = () => (0, react_1.useContext)(exports.ValidationContext);
exports.useValidation = useValidation;
function ValidationProvider({ children, field, errorMessageProps }) {
    const useDSFormHook = (0, FormContext_1.useForm)();
    const useReactHookFormContext = (0, react_hook_form_1.useFormContext)();
    const useReactHookForm = (0, react_hook_form_1.useForm)();
    const form = (useDSFormHook?.control ? useDSFormHook :
        useReactHookFormContext?.control ? useReactHookFormContext :
            useReactHookForm);
    const { errors } = (0, react_hook_form_1.useFormState)({ control: form.control, name: field });
    const value = form?.getValues?.(field);
    const className = form.getFieldState(field).error
        ? "is-invalid"
        : value
            ? "" // ? "is-valid"
            : "";
    if (!field)
        return children;
    return ((0, jsx_runtime_1.jsxs)(exports.ValidationContext.Provider, { value: { className }, children: [children, (0, jsx_runtime_1.jsx)(error_message_1.ErrorMessage, { errors: errors, name: field, render: ({ message, messages }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [message && ((0, jsx_runtime_1.jsx)("small", { ...errorMessageProps, className: `error-message ${errorMessageProps?.className || "text-danger"}`, children: message })), messages && (Object.entries(messages).map(([type, message]) => ((0, jsx_runtime_1.jsx)("small", { ...errorMessageProps, className: `error-message ${type} ${errorMessageProps?.className || "text-danger"}`, children: message }, type))))] })) })] }));
}

"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormProvider = FormProvider;
exports.useForm = useForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Form_1 = __importDefault(require("react-bootstrap/Form"));
const react_hook_form_1 = require("react-hook-form");
const FormExtraContext = (0, react_1.createContext)({
    onSubmit: () => { },
    onError: () => { },
    setProps: () => { }
});
function FormExtraProvider({ children, ...providerProps }) {
    const [formProps, setFormProps] = (0, react_1.useState)(providerProps);
    function setProps(props) {
        setFormProps(prev => ({ ...prev, ...props }));
    }
    return ((0, jsx_runtime_1.jsx)(FormExtraContext.Provider, { value: { ...formProps, setProps }, children: children }));
}
function HookFormProvider({ children, useFormProps, onSubmit: onSubmitProp, onError: onErrorProp, ...props }) {
    const form = (0, react_hook_form_1.useForm)(useFormProps);
    const context = (0, react_1.useContext)(FormExtraContext);
    const onSubmit = context?.onSubmit || onSubmitProp || (() => { });
    const onError = context?.onError || onErrorProp || (() => { });
    return ((0, jsx_runtime_1.jsx)(react_hook_form_1.FormProvider, { ...form, children: (0, jsx_runtime_1.jsx)(Form_1.default, { noValidate: true, ...props, onSubmit: form.handleSubmit(onSubmit, onError), children: children }) }));
}
function FormProvider({ children, context: contextProp, ...props }) {
    const context = contextProp;
    return ((0, jsx_runtime_1.jsx)(FormExtraProvider, { ...context, children: (0, jsx_runtime_1.jsx)(HookFormProvider, { ...props, onSubmit: context?.onSubmit || props?.onSubmit, onError: context?.onError || props?.onError, children: children }) }));
}
function useForm() {
    const formContext = (0, react_hook_form_1.useFormContext)();
    const extraContext = (0, react_1.useContext)(FormExtraContext);
    return {
        ...formContext,
        context: extraContext
    };
}

import { FormProps as BSFormProps } from "react-bootstrap/Form";
import { SubmitErrorHandler, UseFormProps, FieldValues, SubmitHandler } from "react-hook-form";
import { PropsWithChildren } from "react";
export type DSFormProviderProps<FormDataType extends FieldValues, ContextProps = {}> = PropsWithChildren<{
    useFormProps?: Omit<UseFormProps<FormDataType>, "context">;
    context?: FormExtraContextProps<FormDataType, ContextProps>;
    onSubmit?: SubmitHandler<FormDataType>;
    onError?: SubmitErrorHandler<FormDataType>;
} & Omit<BSFormProps, "onError" | "onSubmit">>;
export type FormExtraContextProps<FormDataType extends FieldValues, ContextProps = {}> = {
    onSubmit?: SubmitHandler<FormDataType>;
    onError?: SubmitErrorHandler<FormDataType>;
    setProps: (props: Partial<Omit<FormExtraContextProps<FormDataType, ContextProps>, "setProps">>) => void;
} & ContextProps;
export declare function FormProvider<FormDataType extends FieldValues, ContextProps = {}>({ children, context: contextProp, ...props }: Omit<DSFormProviderProps<FormDataType, ContextProps>, "context"> & {
    context?: ContextProps;
}): import("react/jsx-runtime").JSX.Element;
export declare function useForm<FormType extends FieldValues, ContextProps = {}>(): {
    context: FormExtraContextProps<FormType, ContextProps>;
    watch: import("react-hook-form").UseFormWatch<FormType>;
    getValues: import("react-hook-form").UseFormGetValues<FormType>;
    getFieldState: import("react-hook-form").UseFormGetFieldState<FormType>;
    setError: import("react-hook-form").UseFormSetError<FormType>;
    clearErrors: import("react-hook-form").UseFormClearErrors<FormType>;
    setValue: import("react-hook-form").UseFormSetValue<FormType>;
    trigger: import("react-hook-form").UseFormTrigger<FormType>;
    formState: import("react-hook-form").FormState<FormType>;
    resetField: import("react-hook-form").UseFormResetField<FormType>;
    reset: import("react-hook-form").UseFormReset<FormType>;
    handleSubmit: import("react-hook-form").UseFormHandleSubmit<FormType, undefined>;
    unregister: import("react-hook-form").UseFormUnregister<FormType>;
    control: import("react-hook-form").Control<FormType, any>;
    register: import("react-hook-form").UseFormRegister<FormType>;
    setFocus: import("react-hook-form").UseFormSetFocus<FormType>;
};

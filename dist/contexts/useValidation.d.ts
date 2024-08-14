import { FieldValues, RegisterOptions } from "react-hook-form";
export type UseValidationProps = {
    field: string;
    registerOptions?: RegisterOptions<FieldValues, string>;
    errorMessageProps?: React.HTMLAttributes<HTMLElement>;
};
export declare const useValidation: ({ field, errorMessageProps, registerOptions }: UseValidationProps) => {
    className: string;
    ErrorMessage: import("react/jsx-runtime").JSX.Element | null;
    ValidationInput: import("react/jsx-runtime").JSX.Element | null;
};

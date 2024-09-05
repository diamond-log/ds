export type DSValidationContextProps = {
    className: string;
};
export declare const ValidationContext: import("react").Context<DSValidationContextProps>;
export declare const useValidation: () => DSValidationContextProps;
export type DSValidationProviderProps = {
    children: React.ReactNode;
    field: string;
    errorMessageProps?: React.HTMLAttributes<HTMLElement>;
};
export declare function ValidationProvider({ children, field, errorMessageProps }: DSValidationProviderProps): string | number | boolean | import("react/jsx-runtime").JSX.Element | Iterable<import("react").ReactNode> | null | undefined;

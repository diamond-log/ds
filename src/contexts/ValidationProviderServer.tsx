import { DSValidationProviderProps, ValidationProvider } from "./ValidationContext";

export const ValidationProviderServer = ({ children, ...props}: DSValidationProviderProps) => {
    return (
        <ValidationProvider {...props}>
            {children}
        </ValidationProvider>
    )
}
import { FieldValues, UseFormReturn, useFormContext, useFormState } from "react-hook-form";
import { useForm } from "./FormContext";
import { createContext, useContext } from "react";

export type DSValidationContextProps = {
  className: string;
};

export const ValidationContext = createContext<DSValidationContextProps>({ className: "" });

// export function useValidation< M extends FieldValues, R extends UseFormReturn<M> >(field: keyof M, useFormContext?: () => R) {
export const useValidation = () => useContext(ValidationContext);

export type DSValidationProviderProps = {
  children: React.ReactNode;
  field?: string;
  errorMessageProps?: React.HTMLAttributes<HTMLElement>;
}

export function ValidationProvider({ children, field, errorMessageProps }: DSValidationProviderProps) {
  const dsFormHook = useForm<any>();
  const reactHookForm = useFormContext();
  const form = (dsFormHook || reactHookForm) as UseFormReturn;
  const { errors } = useFormState({ control: form.control, name: field });
  const value = form?.getValues?.(field);
  const className = errors[field]
    ? "is-invalid"
    : value
      ? "" // ? "is-valid"
      : "";

  if (!field) return children;

  return (
    <ValidationContext.Provider value={{ className }}>
      {children}
      <small {...errorMessageProps} className={`${errorMessageProps?.className || "text-danger"}`}>
        {(errors?.[field]?.message) as unknown as React.ReactNode}
      </small>
    </ValidationContext.Provider>
  )
}
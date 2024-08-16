'use client';

import { UseFormReturn, useFormContext, useFormState, useForm as useFormHook } from "react-hook-form";
import { useForm } from "./FormContext";
import { createContext, useContext } from "react";

export type DSValidationContextProps = {
  className: string;
  ErrorMessage: React.ReactNode;
};

export const ValidationContext = createContext<DSValidationContextProps>({ className: "", ErrorMessage: null  });

// export function useValidation< M extends FieldValues, R extends UseFormReturn<M> >(field: keyof M, useFormContext?: () => R) {
export const useValidation = () => useContext(ValidationContext);

export type DSValidationProviderProps = {
  children: React.ReactNode;
  field?: string;
  errorMessageProps?: React.HTMLAttributes<HTMLElement>;
}

export function ValidationProvider({ children, field, errorMessageProps = {} }: DSValidationProviderProps) {
    const { control } = useFormHook();
    const dsFormHook = useForm<any>();
    const reactHookFormContext = useFormContext();
    const form = (dsFormHook || reactHookFormContext) as UseFormReturn;
    //   const useState = form?.control ? useFormState : (() => {}) as typeof useFormState;
    //   const formState = useState({ control: form ? form?.control : undefined, name: field });
    const { errors } = useFormState({ control: form?.control || control, name: field });
    const value = field ? form?.getValues?.(field) : "";
    const className = field && errors[field]
        ? "is-invalid"
        : value
        ? "" // ? "is-valid"
        : "";

    const ErrorMessage = field && errors?.[field]?.message ? (
        <small {...errorMessageProps} className={`${errorMessageProps?.className || "text-danger"}`}>
            {(errors?.[field]?.message) as unknown as React.ReactNode}
        </small>
    ) : null;

  if (!field) return children;

  return (
    <ValidationContext.Provider value={{ className, ErrorMessage }}>
      {children}
      {/* {
        errors?.[field]?.message && (
          <small {...errorMessageProps} className={`${errorMessageProps?.className || "text-danger"}`}>
            {(errors?.[field]?.message) as unknown as React.ReactNode}
          </small>
        )
      } */}
    </ValidationContext.Provider>
  )
}

import { FieldValues, UseFormReturn, useFormContext, useForm as useHookForm, useFormState } from "react-hook-form";
import { useForm } from "./FormContext";
import { createContext, useContext } from "react";
import { ErrorMessage } from "@hookform/error-message";

export type DSValidationContextProps = {
  className: string;
};

export const ValidationContext = createContext<DSValidationContextProps>({ className: "" });

// export function useValidation< M extends FieldValues, R extends UseFormReturn<M> >(field: keyof M, useFormContext?: () => R) {
export const useValidation = () => useContext(ValidationContext);

export type DSValidationProviderProps = {
  children: React.ReactNode;
  field: string;
  errorMessageProps?: React.HTMLAttributes<HTMLElement>;
}

export function ValidationProvider({ children, field, errorMessageProps }: DSValidationProviderProps) {
  const useDSFormHook = useForm<any>();
  const useReactHookFormContext = useFormContext();
  const useReactHookForm = useHookForm();
  const form = (
    useDSFormHook?.control ? useDSFormHook :
    useReactHookFormContext?.control ? useReactHookFormContext :
    useReactHookForm
  ) as UseFormReturn;
  const { errors } = useFormState({ control: form.control, name: field });
  const value = form?.getValues?.(field);
  const className = form.getFieldState(field).error
    ? "is-invalid"
    : value
      ? "" // ? "is-valid"
      : "";
    
  if (!field) return children;

  return (
    <ValidationContext.Provider value={{ className }}>
      {children}
      <ErrorMessage
      errors={errors}
      name={field}
      render={({ message, messages }) => (
        <>
          {
            message && (
              <small {...errorMessageProps} className={`error-message ${errorMessageProps?.className || "text-danger"}`}>
                {message}
              </small>
            )
          }
          {
            messages && (
              Object.entries(messages).map(([type, message]) => (
                <small key={type} {...errorMessageProps} className={`error-message ${type} ${errorMessageProps?.className || "text-danger"}`}>
                  {message}
                </small>
              ))
            )
          }
        </>
      )}
      />
    </ValidationContext.Provider>
  )
}
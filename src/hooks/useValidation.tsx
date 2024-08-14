'use client';

import { FieldValues, RegisterOptions, UseFormReturn, useController, useFormContext, useFormState as useFormStateHook } from "react-hook-form";
import { useForm } from "../contexts/FormContext";
import { createContext, useContext, useEffect } from "react";

// export function useValidation< M extends FieldValues, R extends UseFormReturn<M> >(field: keyof M, useFormContext?: () => R) {

export type UseValidationProps = {
  field: string;
  registerOptions?: RegisterOptions<FieldValues, string>;
  errorMessageProps?: React.HTMLAttributes<HTMLElement>;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const useValidation = ({ field, errorMessageProps, registerOptions, inputRef }: UseValidationProps) => {
  const dsFormHook = useForm<any>();
  const reactHookForm = useFormContext();
  const form = (dsFormHook || reactHookForm) as UseFormReturn;
  const useFormState = form?.control ? useFormStateHook : (() => {}) as typeof useFormStateHook;
  const formState = useFormState({ control: form ? form?.control : undefined, name: field });
  const errors = formState?.errors;
  const value = field ?  form?.getValues?.(field) : "";
  const className = field && errors[field]
    ? "is-invalid"
    : value
      ? "" // ? "is-valid"
      : "";


  return {
    className,
    ErrorMessage: (
      errors?.[field]?.message ? (
        <small {...errorMessageProps} className={`${errorMessageProps?.className || "text-danger"}`}>
          {(errors?.[field]?.message) as unknown as React.ReactNode}
        </small>
      ) : null
    ),
    ValidationInput: (
      registerOptions ? (
        <input
        className="input-validation"
        style={{
          display: 'none',
          visibility: 'hidden',
          position: 'absolute',
          pointerEvents: 'none',
          opacity: 0,
          height: 0,
          width: 0
        }}
        {...form.register(field, registerOptions)}
        />
      ) : null
    )
  }
}
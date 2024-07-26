import { FieldValues, UseFormReturn } from "react-hook-form";
import { useForm } from "../contexts/FormContext";

export function useValidation< M extends FieldValues, R extends UseFormReturn<M> >(field: keyof M, useFormContext?: () => R) {
  // const form = useForm<R>() || useFormContext();
  // const value = form?.getValues?.(field);
  // const className = form?.formState?.errors[field]
  //   ? "is-invalid"
  //   : value
  //     ? "" // ? "is-valid"
  //     : "";

  // function ErrorMessage(props: React.HTMLAttributes<HTMLElement>) {
  //   const { className, ...rest } = props;
  //   return (
  //     <small className={`text-danger ${className}`} {...rest}>
  //       {form?.formState?.errors?.[field]?.message}
  //     </small>
  //   );
  // }

  // return { className, ErrorMessage };

  return { className: '', ErrorMessage: () => null }
}
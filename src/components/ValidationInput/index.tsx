import { FieldValues, RegisterOptions, UseFormReturn, useFormContext, useFormState, useForm as useHookForm } from "react-hook-form";
import { useForm } from "../../contexts/FormContext";

export type ValidationInputProps = {
    field: string;
    registerOptions?: RegisterOptions<FieldValues, string>;
  }

export const ValidationInput = ({ field, registerOptions }: ValidationInputProps) => {

    const useDSFormHook = useForm<any>();
    const useReactHookFormContext = useFormContext();
    const useReactHookForm = useHookForm();
    const form = (
        useDSFormHook?.control ? useDSFormHook :
        useReactHookFormContext?.control ? useReactHookFormContext :
        useReactHookForm
    ) as UseFormReturn;

    return (
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
    );
}
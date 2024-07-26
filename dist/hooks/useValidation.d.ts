import { FieldValues, UseFormReturn } from "react-hook-form";
export declare function useValidation<M extends FieldValues, R extends UseFormReturn<M>>(field: keyof M, useFormContext?: () => R): {
    className: string;
    ErrorMessage: () => null;
};

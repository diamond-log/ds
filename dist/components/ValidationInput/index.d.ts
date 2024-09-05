import { FieldValues, RegisterOptions } from "react-hook-form";
export type ValidationInputProps = {
    field: string;
    registerOptions?: RegisterOptions<FieldValues, string>;
};
export declare const ValidationInput: ({ field, registerOptions }: ValidationInputProps) => import("react/jsx-runtime").JSX.Element;

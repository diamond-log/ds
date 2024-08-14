import { FormControlProps } from "react-bootstrap/FormControl";
export declare const Input: import("react").ForwardRefExoticComponent<{
    as?: React.ElementType<any, any> & keyof JSX.IntrinsicElements;
    togglePasswordVisibility?: boolean;
    alert?: {
        type: "success" | "warning" | "danger";
        message?: React.ReactNode;
        containerClassName?: string;
    };
    labelId?: string;
    labelClassName?: string;
    icon?: React.ReactNode;
    containerProps?: React.HTMLProps<HTMLDivElement>;
} & FormControlProps & Omit<{
    intltextposition?: "left" | "right";
    dictionary?: Record<string, string>;
    testText?: [start: number, end: number];
    labelId?: string;
    labelClassName?: string;
}, "intltextposition"> & import("react").RefAttributes<FormControlProps>>;

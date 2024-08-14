import { FormControlProps } from "react-bootstrap/FormControl";
import { IntlProps } from "./IntlProps";

export type DSInputProps = {
    as?: React.ElementType<any, any> & keyof JSX.IntrinsicElements;
    togglePasswordVisibility?: boolean;
    alert?: {
        type: "success" | "warning" | "danger";
        message?: React.ReactNode;
        containerClassName?: string;
    }
    labelId?: string;
    labelClassName?: string;
    icon?: React.ReactNode;
    containerProps?: React.HTMLProps<HTMLDivElement>;
} & FormControlProps & Omit<IntlProps, "intltextposition">;
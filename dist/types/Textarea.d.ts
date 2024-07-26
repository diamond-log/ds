import { FormControlProps } from "react-bootstrap/esm/FormControl";
import { IntlProps } from "./IntlProps";
export type DSTextareaProps = {
    as?: React.ElementType<any, any> & keyof JSX.IntrinsicElements;
    autoResize?: boolean;
} & FormControlProps & Omit<IntlProps, "intltextposition">;

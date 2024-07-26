import { ButtonProps } from "react-bootstrap/Button";
import { BootstrapVariants } from "./BootstrapVariants";
import { IntlProps } from "./IntlProps";

export type DSButtonProps<IdType = string> = {
    id?: IdType;
    as?: React.ElementType<any, keyof JSX.IntrinsicElements> & keyof JSX.IntrinsicElements;
    variant?: BootstrapVariants;
} & Omit<ButtonProps, "id"> & Pick<IntlProps, "dictionary" | "intltextposition" | "testText">;
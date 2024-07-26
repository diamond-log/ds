import { BootstrapVariants } from "../../types/BootstrapVariants";
import { IntlProps } from "../../types/IntlProps";
import { DSButtonProps } from "../../types/Button";
import { DSInputProps } from "../../types/Input";
import { LinkProps } from "next/link";
import { DSTagFieldProps } from "../TagField";
import { DSSelectProps } from "../../types/Select";
import { ReactHTML, HTMLAttributes, ReactNode } from "react";
interface ButtonElement extends DSButtonProps, Omit<IntlProps, "labelId" | "labelClassName"> {
    as: "button";
}
interface LinkElement extends LinkProps, Omit<IntlProps, "labelId" | "labelClassName"> {
    as: "a";
    href: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}
interface InputElement extends DSInputProps, Omit<IntlProps, "intltextposition"> {
    as: "input";
    type?: HTMLInputElement["type"];
}
interface TextareaElement extends DSInputProps, Omit<IntlProps, "intltextposition"> {
    as: "textarea";
}
interface InputTagElement extends Omit<DSTagFieldProps, "addTag">, Omit<IntlProps, "intltextposition"> {
    as: "input-tag";
}
interface SelectElement extends DSSelectProps {
    as: "select";
}
interface OthersElements extends Pick<IntlProps, "testText" | "intltextposition">, HTMLAttributes<HTMLSpanElement> {
    as: keyof ReactHTML;
}
export type UnionElementsProps = (ButtonElement | LinkElement | InputElement | TextareaElement | InputTagElement | SelectElement | OthersElements);
export type IntlElementProps = {
    variant?: BootstrapVariants;
    id?: string;
    className?: string;
    children?: ReactNode;
} & UnionElementsProps;
export declare function IntlElementFactory<T extends Record<string, any>>(dictionaryProp: T, form?: string): import("react").ForwardRefExoticComponent<IntlElementProps & import("react").RefAttributes<any>>;
export {};

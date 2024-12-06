import { ReactNode } from "react";
import { BootstrapVariants } from "./BootstrapVariants";
import { IntlProps } from "./IntlProps";
import { DSMagicInputProps } from "./MagicInput";
import { DSSelectProps } from "./Select";
import { DSTagFieldProps } from "../components/TagField";
import { DSInputProps } from "./Input";
import { LinkProps } from "next/link";
import { DSButtonProps } from "./Button";

export interface ButtonElement extends DSButtonProps, Omit<IntlProps, "labelId" | "labelClassName"> {
	as: "button";
};

export interface LinkElement extends LinkProps, Omit<IntlProps, "labelId" | "labelClassName"> {
	as: "a";
	href: string;
	target?: "_blank" | "_self" | "_parent" | "_top";
};

export interface InputElement extends DSInputProps, Omit<IntlProps, "intltextposition"> {
	as: "input";
	type?: HTMLInputElement["type"];
};

export interface TextareaElement extends DSInputProps, Omit<IntlProps, "intltextposition"> {
	as: "textarea";
};

export interface InputTagElement extends Omit<DSTagFieldProps, "addTag">, Omit<IntlProps, "intltextposition"> {
	as: "input-tag";
};

export interface SelectElement extends DSSelectProps {
	as: "select";
}

export interface MagicInputElement extends Omit<DSMagicInputProps, "as"> {
	as: "magic-input";
}

export interface OthersElements extends Pick<IntlProps, "testText" | "intltextposition">, React.HTMLAttributes<HTMLSpanElement> {
	as: keyof React.ReactHTML;
}

export type UnionElementsProps = (ButtonElement | LinkElement | InputElement | TextareaElement | InputTagElement | SelectElement | MagicInputElement | OthersElements);

export type IntlElementProps = {
	variant?: BootstrapVariants;
	id?: string;
	className?: string;
	children?: ReactNode;
} & UnionElementsProps;
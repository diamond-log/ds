import { createElement, forwardRef } from "react";
import { BootstrapVariants } from "../../types/BootstrapVariants";
import { IntlProps } from "../../types/IntlProps";
import { idToIndex } from "../../utils/idToIndex";
import { Button } from "../Button";
import { Input } from "../Input";
import { DSButtonProps } from "../../types/Button";
import { DSInputProps } from "../../types/Input";
import Link, { LinkProps } from "next/link";
import { loremText } from "../../utils/loremText";
import { Textarea } from "../Textarea";
import { DSTagFieldProps, TagField } from "../TagField";
import { DSSelectProps } from "../../types/Select";
import { Select } from "../Select";
import { ReactHTML, HTMLAttributes, ReactNode } from "react";

interface ButtonElement extends DSButtonProps, Omit<IntlProps, "labelId" | "labelClassName"> {
	as: "button";
};

interface LinkElement extends LinkProps, Omit<IntlProps, "labelId" | "labelClassName"> {
	as: "a";
	href: string;
	target?: "_blank" | "_self" | "_parent" | "_top";
};

interface InputElement extends DSInputProps, Omit<IntlProps, "intltextposition"> {
	as: "input";
	type?: HTMLInputElement["type"];
};

interface TextareaElement extends DSInputProps, Omit<IntlProps, "intltextposition"> {
	as: "textarea";
};

interface InputTagElement extends Omit<DSTagFieldProps, "addTag">, Omit<IntlProps, "intltextposition"> {
	as: "input-tag";
};

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

type DictionaryType = Record<string, string | Record<string, string>>;

export function IntlElementFactory<T extends Record<string, any>>(dictionaryProp: T, form?: string) {
	return forwardRef<any, IntlElementProps>(({ ...allProps }, ref) => {

			const props = allProps as IntlElementProps & IntlProps;

			// if(!dictionaryProp) {
			// 	throw new Error(`Element '${allProps.as}' is missing dictionary property`);
			// }
			// if(!props.id && !props.labelId) {
			// 	throw new Error(`Element '${allProps.as}' is missing id property`, {
			// 		cause: props
			// 	});
			// }
			// if(
			// 	!form &&
			// 	!dictionaryProp?.[idToIndex(allProps.id)] &&
			// 	!dictionaryProp?.[idToIndex(props.labelId)]
			// ) {
			// 	throw new Error(`Property '${allProps.id}' not found in dictionary for element '${allProps.as}'`, {
			// 		cause: dictionaryProp
			// 	});
			// }
			// if(
			// 	form &&
			// 	!dictionaryProp?.[idToIndex(form)]?.[idToIndex(props.id)] &&
			// 	!dictionaryProp?.[idToIndex(form)]?.[idToIndex(props.labelId)]
			// ) {
			// 	throw new Error(`Property '${allProps.id || props.labelId}' of object '${form}' not found in dictionary for element '${allProps.as}'`, {
			// 		cause: dictionaryProp
			// 	});
			// }

			const testText = props?.testText;
			
			const variant = props?.variant;
			const className = props?.className;
			const intlText: string = 
				testText
					? ""
					: form 
						? dictionaryProp[idToIndex(form)][idToIndex(props?.id)] 
						: dictionaryProp[idToIndex(props?.id)];

			const children = (() => {
				if (testText) return loremText.slice(...testText);
				if (props?.children) {
					const position = props.intltextposition;
					return position === "left" ? 
						<>{intlText} {props.children}</>
						: <>{props.children} {intlText}</> 
				}
				return intlText;
			})();

			const dictionary = (form ? dictionaryProp[idToIndex(form)] : dictionaryProp) as Record<string, string>;

			switch (props.as) {
				case "button": {
					return <Button {...props} dictionary={dictionary }/>
				}
				case "input-tag": {
					return <TagField {...props} dictionary={dictionary}/>
				}
				case "input": {
					return <Input {...props} ref={ref} dictionary={dictionary}/>
				}
				case "textarea": {
					return <Textarea {...props} ref={ref} dictionary={dictionary}/>
				}
				case "a": {
					const { as, ...linkProps } = props as LinkElement;
					return <Link {...{...linkProps, children, ref}} />
				}
				case "select": {
					return <Select {...props} dictionary={dictionary} ref={ref}/>
				}
				default: {
					return createElement(props.as, {
						...props,
						children,
						className: variant ? `${variant} ${className}` : className,
						ref: ref,
					});
				}
			}
		}
	);
}
import Link from "next/link";
import { createElement, forwardRef } from "react";
import { IntlElementProps, LinkElement } from "../../types/IntlElement";
import { IntlProps } from "../../types/IntlProps";
import { idToIndex } from "../../utils/idToIndex";
import { loremText } from "../../utils/loremText";

export function ServerIntlElement<T extends Record<string, any>>(dictionaryProp: T, form?: string) {
	return forwardRef<any, IntlElementProps>(({ ...allProps }, ref) => {

			const props = allProps as IntlElementProps & IntlProps;

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

			switch (props.as) {
				case "a": {
					const { as, ...linkProps } = props as LinkElement;
					return <Link {...{...linkProps, children, ref}} />
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
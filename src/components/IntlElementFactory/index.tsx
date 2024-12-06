import { forwardRef } from "react";
import { IntlElementProps } from "../../types/IntlElement";
import ClientIntlElement from "./ClientIntlElement";
import { ServerIntlElement } from "./ServerIntlElement";


export function IntlElementFactory<T extends Record<string, any>>(dictionaryProp: T, form?: string) {
	return forwardRef<any, IntlElementProps>(({ ...props }, ref) => {

			switch (props.as) {
				case "input-tag":
				case "input":
				case "textarea":
				case "select":
				case "magic-input":
				case "button": {
					const Node = ClientIntlElement(dictionaryProp, form);

					return <Node {...props} ref={ref} />;
				}
				default: {
					const Node = ServerIntlElement(dictionaryProp, form);

					return <Node {...props} ref={ref} />;
				}
			}
		}
	);
}
"use client";

import { forwardRef } from "react";
import { ValidationProvider } from "../../contexts/ValidationContext";
import { IntlProps } from "../../types/IntlProps";
import { idToIndex } from "../../utils";
import { Button } from "../Button";
import { Input } from "../Input";
import MagicInput from "../MagicInput";
import { Select } from "../Select";
import { TagField } from "../TagField";
import { Textarea } from "../Textarea";
import { IntlElementProps } from "../../types/IntlElement";

function ClientIntlElement<T extends Record<string, any>>(dictionaryProp: T, form?: string) {
	return forwardRef<any, IntlElementProps>(({ ...allProps }, ref) => {

			const props = allProps as IntlElementProps & IntlProps;

			const dictionary = (form ? dictionaryProp[idToIndex(form)] : dictionaryProp) as Record<string, string>;
			const name: string | undefined = (props as React.InputHTMLAttributes<HTMLInputElement>)?.name!;

			switch (props.as) {
				case "button": {
					return <Button {...props} dictionary={dictionary }/>
				}
				case "input-tag": {
					return (
						<ValidationProvider field={props.field}>
							<TagField {...props} dictionary={dictionary}/>
						</ValidationProvider>
					)
				}
				case "input": {
					return (
						<ValidationProvider field={name}>
							<Input {...props} ref={ref} dictionary={dictionary}/>
						</ValidationProvider>
					)
				}
				case "textarea": {
					return (
						<ValidationProvider field={name}>
							<Textarea {...props} ref={ref} dictionary={dictionary}/>
						</ValidationProvider>
					)
				}
				case "select": {
					return (
						<ValidationProvider field={name}>
							<Select {...props} dictionary={dictionary} ref={ref}/>
						</ValidationProvider>
					)
				}
				case "magic-input": {
					return (
						<ValidationProvider field={name}>
							<MagicInput {...props} as={undefined} dictionary={dictionary} ref={ref} />
						</ValidationProvider>
					)
				}
			}
		}
	);
}

export default ClientIntlElement;
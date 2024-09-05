"use client";

import { createContext, useContext, useState } from "react";
import Form, { FormProps as BSFormProps } from "react-bootstrap/Form";
import { FormProvider as Provider, SubmitErrorHandler, useForm as useHookForm, useFormContext, UseFormProps, FieldValues, SubmitHandler } from "react-hook-form";
import { PropsWithChildren } from "react";

// refactor context type
export type DSFormProviderProps<FormDataType extends FieldValues, ContextProps = {}> = PropsWithChildren<{
    useFormProps?: Omit<UseFormProps<FormDataType>, "context">;
	context?: FormExtraContextProps<FormDataType, ContextProps>;
	onSubmit?: SubmitHandler<FormDataType>;
    onError?: SubmitErrorHandler<FormDataType>;
} & Omit<BSFormProps, "onError" | "onSubmit">>;

export type FormExtraContextProps<FormDataType extends FieldValues, ContextProps = {}> = {
	onSubmit?: SubmitHandler<FormDataType>;
    onError?: SubmitErrorHandler<FormDataType>;
	setProps: (props: Partial< Omit < FormExtraContextProps<FormDataType, ContextProps>, "setProps" > >) => void;
} & ContextProps;

const FormExtraContext = createContext<FormExtraContextProps<any, any>>({
	onSubmit: () => {},
	onError: () => {},
	setProps: () => {}
});

function FormExtraProvider<FormDataType extends FieldValues, ContextProps = {}>({ children, ...providerProps }: PropsWithChildren< Omit< FormExtraContextProps<FormDataType, ContextProps>, "setProps" > >) {

	const [formProps, setFormProps] = useState(providerProps);

	function setProps(props: Omit<FormExtraContextProps<FormDataType, ContextProps>, "setProps">) {
		setFormProps(prev => ({...prev, ...props}));
	}

	return (
		<FormExtraContext.Provider value={{ ...formProps, setProps }}>
			{children}
		</FormExtraContext.Provider>
	)
}

function HookFormProvider<FormDataType extends FieldValues, ContextProps = {}>(
	{ children, useFormProps, onSubmit: onSubmitProp, onError: onErrorProp, ...props}: DSFormProviderProps<FormDataType>
) {

	const form = useHookForm(useFormProps);
	const context = useContext<FormExtraContextProps<FormDataType, ContextProps>>(FormExtraContext);
	const onSubmit: SubmitHandler<FormDataType> = context?.onSubmit as SubmitHandler<FormDataType> || onSubmitProp || (() => {});
	const onError: SubmitErrorHandler<FormDataType> = context?.onError as SubmitErrorHandler<FormDataType> || onErrorProp || (() => {});

	return (
		<Provider {...form}>
			<Form
			noValidate
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					e.stopPropagation();
				}
			}}
			{...props}
			onSubmit={(e) => {
				form.handleSubmit(onSubmit, onError)(e);
			}}
			>
				{children}
			</Form>
		</Provider>
	)
}

export function FormProvider
<FormDataType extends FieldValues, ContextProps = {}>
({ children, context: contextProp, ...props}: Omit<DSFormProviderProps<FormDataType, ContextProps>, "context"> & { context?: ContextProps })
{
	const context = contextProp as { onSubmit?: SubmitHandler<FormDataType>, onError?: SubmitErrorHandler<FormDataType> };

	return (
		<FormExtraProvider {...context}>
			<HookFormProvider {...props} onSubmit={context?.onSubmit || props?.onSubmit} onError={context?.onError || props?.onError}>
				{children}
			</HookFormProvider>
		</FormExtraProvider>
	);
}

export function useForm<FormType extends FieldValues, ContextProps = {}>() {
	const formContext = useFormContext<FormType>();
	const extraContext = useContext<FormExtraContextProps<FormType, ContextProps>>(FormExtraContext);

	return {
		...formContext,
		context: extraContext
	};
}
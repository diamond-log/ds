import { FormControlProps } from "react-bootstrap";
import { BsIconProps, Icon } from "../components/Icon";
import { Option } from "../components/MagicInput/Option";
import { IntlProps } from "../types";

export type DSControlProps = FormControlProps & React.InputHTMLAttributes<any> & {
	icon?: React.ReactElement<BsIconProps, typeof Icon>;
	iconPosition?: 'start' | 'end';
}

export type DSMagicInputProps = {
	children?: React.ReactElement<DSOptionProps, typeof Option> | React.ReactElement<DSOptionProps, typeof Option>[];
} & (
	React.PropsWithChildren<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> &
	Omit<IntlProps, "intltextposition"> &
	DSControlProps
)


export interface DSOptionProps {
	// value: string;
	children: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export type DSMagicInputWrapper = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;
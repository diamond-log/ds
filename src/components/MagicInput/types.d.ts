import { BsIconProps, Icon } from "../../Icon";
import { FormControl, FormControlProps } from "react-bootstrap";
import { Option } from "./Option";
import { IntlElementProps } from "../IntlElementFactory";
import { IntlProps } from "../../types";

type DSControlProps = FormControlProps & React.InputHTMLAttributes<any> & {
	icon?: React.ReactElement<BsIconProps, typeof Icon>;
	iconPosition?: 'start' | 'end';
}

type DSMagicInputProps = {
	children?: React.ReactElement<DSOptionProps, typeof Option> | React.ReactElement<DSOptionProps, typeof Option>[];
} & (
	React.PropsWithChildren<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> &
	Omit<IntlProps, "intltextposition"> &
	DSControlProps
)


interface DSOptionProps {
	// value: string;
	children: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

type DSMagicInputWrapper = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;
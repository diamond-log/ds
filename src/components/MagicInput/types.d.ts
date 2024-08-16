import { BsIconProps, Icon } from "../../Icon";
import { FormControl, FormControlProps } from "react-bootstrap";
import { Option } from "./Option";

type ControlProps = FormControlProps & React.InputHTMLAttributes<any> & {
	icon?: React.ReactElement<BsIconProps, typeof Icon>;
	iconPosition?: 'start' | 'end';
}

interface MagicInputProps extends React.PropsWithChildren<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> implements ControlProps {
	children?: React.ReactElement<OptionProps, typeof Option> | React.ReactElement<OptionProps, typeof Option>[];
}

interface OptionProps {
	// value: string;
	children: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

type MagicInputWrapper = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;
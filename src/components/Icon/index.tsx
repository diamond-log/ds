import { forwardRef } from "react";
import { BootstrapVariants } from "../../types/BootstrapVariants";

export interface BsIconProps {
	name: string;
	size?: '1' | '2' | '3' | '4' | '5' | '6';
	// variant?: BootstrapVariants;
	variant?: string;
}

export type DSIconProps = BsIconProps & React.HTMLAttributes<HTMLElement>;

export const Icon = forwardRef((props: DSIconProps, ref: React.ForwardedRef<HTMLElement>) => {
	const { name, size, variant, className, ...iconProps } = props;

	let result = `bi bi-${name}`;

	if (size) {
		result = result.concat(` fs-${size}`);
	}

	if (variant) {
		result = result.concat(` text-${variant}`);
	}

	if (className) {
		result = result.concat(` ${className}`);
	}

	return (
		<i
			ref={ref}
			className={result}
			{...iconProps}
		/>
	)
});
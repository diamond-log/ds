// React
import { type CSSProperties, forwardRef } from 'react';

// Types
import { DSControlProps } from '../../types/MagicInput';
import { useValidation } from '../../contexts/ValidationContext';

export const Control = forwardRef((props: DSControlProps, ref: React.ForwardedRef<HTMLInputElement>) => {

	const { icon, iconPosition, className, ...inputProps } = props;
	const validation = useValidation();
	const validationClassName = validation?.className || '';

	const wrapperStyle: CSSProperties = {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
	}

	const controlStyle: CSSProperties = {
		...inputProps.style,
		paddingLeft: (icon && iconPosition == 'start') ? '2rem' : undefined,
	}

	function getIconWrapperStyles(): CSSProperties {

		const commonStyle: CSSProperties = {
			position: 'absolute'
		}

		if (inputProps.type === 'number' && iconPosition === 'end') {
			return {
				...commonStyle,
				right: '2rem'
			}
		} else if (iconPosition === 'end') {
			return {
				...commonStyle,
				right: '0.5rem'
			}
		} else {
			return {
				...commonStyle,
				left: '0.5rem'
			}
		}

	}

	return (
		<div style={wrapperStyle}>
			<input
			{...inputProps}
			className={(validationClassName ? `${validationClassName} ` : '') + className}
			style={controlStyle}
			ref={ref}
			/>
			{icon &&
				<span style={getIconWrapperStyles()}>{icon}</span>
			}
		</div>
	)
});
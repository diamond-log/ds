// React
import { type CSSProperties, forwardRef } from 'react';

// Types
import { ControlProps } from './types';

export const Control = forwardRef((props: ControlProps, ref: React.ForwardedRef<HTMLInputElement>) => {

	const { icon, iconPosition, ...inputProps } = props;

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
				style={controlStyle}
				ref={ref}
			/>
			{icon &&
				<span style={getIconWrapperStyles()}>{icon}</span>
			}
		</div>
	)
});
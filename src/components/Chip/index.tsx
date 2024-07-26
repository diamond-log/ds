type ChipProps = React.StyleHTMLAttributes<HTMLSpanElement>

export function Chip(props: React.PropsWithChildren & ChipProps) {

	const { style: outerStyle, children, ...otherProps } = props;

	const style: React.CSSProperties = {
		padding: '0 0.5rem',
		borderWidth: '0.075rem',
		borderStyle: 'solid',
		borderRadius: '0.375rem',
		verticalAlign: 'middle',
		display: 'flex',
		alignItems: 'center',
		gap: '0.4rem',
		width: 'fit-content',
		...outerStyle
	}

	return <span style={style} {...otherProps}>{children}</span>
}
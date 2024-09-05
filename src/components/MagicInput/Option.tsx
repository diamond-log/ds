import { DSOptionProps } from "../../types/MagicInput"

export function Option(props: DSOptionProps) {

	const className: { [key: string]: string } = {
		initial: 'option',
		hover: 'option-hover'
	}

	return (
		<div
			className={className.common}
			onClick={props.onClick}
			style={{
				cursor: 'pointer',
				padding: '0.25rem 1rem',
				userSelect: 'none',
				msUserSelect: 'none',
				MozUserSelect: 'none',
				WebkitUserSelect: 'none'
			}}
			onMouseLeave={function (e) { e.currentTarget.className = className.initial }}
			onMouseOver={function (e) { e.currentTarget.className = className.hover }}
		>
			{props.children}
		</div>
	)
}
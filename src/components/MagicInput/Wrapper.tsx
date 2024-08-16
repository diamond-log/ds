import { MagicInputWrapper } from "./types";

export class Wrapper {

	public static Input(props: MagicInputWrapper) {

		const style: React.CSSProperties = {
			display: 'flex',
			alignItems: 'center',
			position: 'relative',
			background: '#fff',
			width: '100%'
		}

		return (
			<div style={style} onPointerOver={props.onPointerOver} onPointerLeave={props.onPointerLeave}>
				{props.children}
			</div>
		)
	}

	public static Suggestions(props: { children: React.ReactNode }) {

		const style: React.CSSProperties = {
			background: '#fff',
			position: 'absolute',
			left: '50%',
			right: '50%',
			transform: 'translateX(-50%)',
			width: '96%',
			zIndex: 1,
			top: '2.5rem',
			maxHeight: '20rem',
			overflowY: 'scroll',
			overflowX: 'hidden'
		}

		return (
			<div className="border border-gray" style={style}>
				{props.children}
			</div>
		)
	}

}
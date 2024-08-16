// React
import { forwardRef, useRef, useState, cloneElement, Children } from "react";

// React-Bootstrap

// Project's components
import { Control } from "./Control";
import { Wrapper } from "./Wrapper";

// Types
import { ControlProps, MagicInputProps, OptionProps } from "./types";

// Utils
import { delay } from "../../utils";

// Hooks
import { mergeRefs } from "react-merge-refs";
import { Icon } from "../Icon";

/**
 * 
 * ============================== [COMPONENT'S HYERARCHY] ==============================
 * <Wrapper.Input>
 *		|
 * 		|____ <Control>
 *		|		|
 * 		|		|____
 *		| 		
 *		|____ <Wrapper.Suggestions>
 *				|
 *				|____ <Option>
 * 					
 * 
 * 
 */

const MagicInput = forwardRef<HTMLInputElement, MagicInputProps & ControlProps>(function (props, ref) {

	// Extract the component props and separate them from the native <input> element properties
	const { onChange, onKeyDown, onBlur, onFocus, size, defaultValue, children, type, iconPosition, className, ...inputProps } = props;

	/**
	 * ============================== [STATES] ==============================
	 * 1 - State to store if the list of suggestions will be shown or not
	 * 2 - State to store the list of suggestions
	 */

	const [showSuggestions, setShowSuggestions] = useState<boolean>();
	const [filtered, setFiltered] = useState<MagicInputProps['children'] | undefined>(children);
	// const [showNumericArrows, setShowNumericArrows] = useState<boolean>(false);

	/**
	 * ============================== [REFS] ==============================
	 * 1 - Ref to hide suggestions on a given delay;
	 * 2 - Control Input Ref
	 */
	const run = useRef(delay(500));
	const controlRef = useRef<HTMLInputElement>();
	// const suggestionIndexRef = useRef(0);
	// const focusRef = useRef(false);

	/**
	 * ============================== [EVENT HANDLERS] ==============================
	 */

	function handleControlChange(e: React.ChangeEvent<HTMLInputElement>): void {

		if (type !== 'select') {

			const { value } = e.currentTarget;

			if (onChange) onChange(e);

			if (children && value && value !== '') {
				setFiltered(() => {
					if (Array.isArray(children)) {
						return [...children.filter(child => child.props.children.toLowerCase().includes(value.toLowerCase()))]
					} else {
						return children
					}
				});
				setShowSuggestions(true);
			} else {
				setShowSuggestions(false);
				setFiltered(() => {
					if (Array.isArray(children)) {
						return [...children];
					} else {
						return children;
					}
				});[]
			}

		}


	}

	function handleControlKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {

		if (type === 'select' && e.key !== 'Tab') {
			e.preventDefault();
		}

		// const child = filtered[suggestionIndexRef.current] as React.ReactElement<OptionProps>;

		switch (e.key) {
			case 'Enter': {
				if (showSuggestions && filtered) {
					e.preventDefault();

					let child: React.ReactElement<OptionProps>;
					if (Array.isArray(filtered)) {
						child = filtered[0];
					} else {
						child = filtered;
					}

					if (child) {
						controlRef.current!.value = child.props.children;
					} else {
						controlRef.current!.value = e.currentTarget.value
					}

					setShowSuggestions(false);
				}
				break;
			}
			// case 'ArrowUp': {
			// 	controlRef.current.value = child.props.children;
			// 	onChange(e);
			// 	if (suggestionIndexRef.current > 0) {
			// 		suggestionIndexRef.current--
			// 	}
			// 	break;
			// }
			// case 'ArrowDown': {
			// 	controlRef.current.value = child.props.children;
			// 	onChange(e);
			// 	if (suggestionIndexRef.current < (filtered as React.ReactElement<OptionProps>[]).length - 1) {
			// 		suggestionIndexRef.current++
			// 	}
			// 	break;
			// }
		}

		if (onKeyDown) onKeyDown(e);
	}

	function handleControlBlur(e: React.FocusEvent<HTMLInputElement>) {

		run.current.execute(function () {
			setShowSuggestions(false);
		});

		if (type === 'number') {
			// focusRef.current = false;
			// setShowNumericArrows(false);
		}

		if (onBlur) onBlur(e);
	}

	function handleControlClick(e: React.MouseEvent<HTMLInputElement>) {
		run.current.clear();
		setShowSuggestions(!showSuggestions)
	}

	function handleControlFocus(e: React.FocusEvent<HTMLInputElement>) {

		// @ts-ignore
		if (children || (type === 'number') && e.target.value !== this) {
			if (onChange) onChange(e);
		}

		if (type === 'number') {
			// setShowNumericArrows(true);
			// focusRef.current = true;
		}

		if (onFocus) onFocus(e);
	}


	/**
	 * ============================== [CSS Inline Styles] ==============================
	 */

	const styles: { [key: string]: React.CSSProperties } = {
		control: {
			caretColor: type === 'select' ? 'transparent' : 'initial',
			cursor: type === 'select' ? 'pointer' : 'initial',
			background: !inputProps.disabled ? 'transparent' : 'revert-layer',
			appearance: type === 'number' ? 'none' : 'initial',
			MozAppearance: type === 'number' ? 'none' : 'initial',
			...inputProps.style
		},
		select: {
			position: 'absolute',
			cursor: 'pointer',
			paddingRight: '0.5rem',
			right: 0,
			zIndex: 1
		},
		number: {
			display: 'grid',
			height: '100%',
			color: 'white',
			position: 'absolute',
			alignItems: 'center',
			right: 0,
			fontSize: '0.6rem',
			padding: '0.2rem 0.5rem',
		}
	}

	return (
		<Wrapper.Input>
			<Control
				{...inputProps}
				ref={mergeRefs([controlRef, ref])}
				type={type}
				className={className ? className : 'form-control'}
				onChange={handleControlChange}
				onKeyDown={handleControlKeyDown}
				onClick={handleControlClick}
				onBlur={handleControlBlur}
				onFocus={handleControlFocus.bind(controlRef.current?.value)}
				iconPosition={type === 'select' ? 'start' : iconPosition}
				autoComplete='false'
				aria-autocomplete="none"
				defaultValue={defaultValue}
				style={styles.control}
			/>
			{type === 'select' &&
				<Icon name="chevron-down"
					onClick={() => {
						controlRef.current?.focus();
						run.current.clear();
						setShowSuggestions(!showSuggestions)
					}}
					style={styles.select}
				/>
			}
			{/* {(type === 'number' && showNumericArrows) &&
				<span
					className={`bg-atvos-primary`}
					style={styles.number}
				>
					<Icon name='chevron-up'
						onClick={() => {
							sumOrSubtract(1)
						}}
					/>
					<Icon name='chevron-down'
						onClick={() => {
							sumOrSubtract(-1)
						}}
					/>
				</span>
			} */}
			{showSuggestions &&
				<Wrapper.Suggestions>
					{
						Children.map(filtered, child =>
							cloneElement(child!, {
								onClick: () => {
									controlRef.current!.value = child!.props.children
									controlRef.current?.focus();
									setShowSuggestions(false);
								}
							})
						)
					}
				</Wrapper.Suggestions>
			}
		</Wrapper.Input>
	)
});

export default MagicInput;

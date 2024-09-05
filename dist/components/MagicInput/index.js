"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// React
const react_1 = require("react");
// React-Bootstrap
// Project's components
const Control_1 = require("./Control");
const Wrapper_1 = require("./Wrapper");
// Utils
const utils_1 = require("../../utils");
// Hooks
const react_merge_refs_1 = require("react-merge-refs");
const Icon_1 = require("../Icon");
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
const MagicInput = (0, react_1.forwardRef)(function (props, ref) {
    // Extract the component props and separate them from the native <input> element properties
    const { onChange, onKeyDown, onBlur, onFocus, size, defaultValue, children, type, iconPosition, className, labelId, labelClassName, dictionary, ...inputProps } = props;
    /**
     * ============================== [STATES] ==============================
     * 1 - State to store if the list of suggestions will be shown or not
     * 2 - State to store the list of suggestions
     */
    const [showSuggestions, setShowSuggestions] = (0, react_1.useState)();
    const [filtered, setFiltered] = (0, react_1.useState)(children);
    // const [showNumericArrows, setShowNumericArrows] = useState<boolean>(false);
    /**
     * ============================== [REFS] ==============================
     * 1 - Ref to hide suggestions on a given delay;
     * 2 - Control Input Ref
     */
    const run = (0, react_1.useRef)((0, utils_1.delay)(100));
    const controlRef = (0, react_1.useRef)();
    // const suggestionIndexRef = useRef(0);
    // const focusRef = useRef(false);
    /**
     * ============================== [EVENT HANDLERS] ==============================
     */
    function handleControlChange(e) {
        if (type !== 'select') {
            const { value } = e.currentTarget;
            if (onChange)
                onChange(e);
            if (children && value && value !== '') {
                setFiltered(() => {
                    if (Array.isArray(children)) {
                        return [...children.filter(child => child.props.children.toLowerCase().includes(value.toLowerCase()))];
                    }
                    else {
                        return children;
                    }
                });
                setShowSuggestions(true);
            }
            else {
                setShowSuggestions(false);
                setFiltered(() => {
                    if (Array.isArray(children)) {
                        return [...children];
                    }
                    else {
                        return children;
                    }
                });
            }
        }
    }
    function handleControlKeyDown(e) {
        if (type === 'select' && e.key !== 'Tab') {
            e.preventDefault();
        }
        // const child = filtered[suggestionIndexRef.current] as React.ReactElement<DSOptionProps>;
        switch (e.key) {
            case 'Enter': {
                if (showSuggestions && filtered) {
                    e.preventDefault();
                    let child;
                    if (Array.isArray(filtered)) {
                        child = filtered[0];
                    }
                    else {
                        child = filtered;
                    }
                    if (child) {
                        controlRef.current.value = child.props.children;
                    }
                    else {
                        controlRef.current.value = e.currentTarget.value;
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
            // 	if (suggestionIndexRef.current < (filtered as React.ReactElement<DSOptionProps>[]).length - 1) {
            // 		suggestionIndexRef.current++
            // 	}
            // 	break;
            // }
        }
        if (onKeyDown)
            onKeyDown(e);
    }
    function handleControlBlur(e) {
        run.current.execute(function () {
            setShowSuggestions(false);
        });
        if (type === 'number') {
            // focusRef.current = false;
            // setShowNumericArrows(false);
        }
        if (onBlur)
            onBlur(e);
    }
    function handleControlClick(e) {
        run.current.clear();
        setShowSuggestions(!showSuggestions);
    }
    function handleControlFocus(e) {
        // @ts-ignore
        if (children || (type === 'number') && e.target.value !== this) {
            if (onChange)
                onChange(e);
        }
        if (type === 'number') {
            // setShowNumericArrows(true);
            // focusRef.current = true;
        }
        if (onFocus)
            onFocus(e);
    }
    /**
     * ============================== [CSS Inline Styles] ==============================
     */
    const styles = {
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
    };
    const LabelComponent = (labelId
        ? ((0, jsx_runtime_1.jsx)("label", { htmlFor: props.id, className: labelClassName + (props?.required ? ' isRequired' : ''), children: dictionary?.[(0, utils_1.idToIndex)(labelId)] || '' }))
        : null);
    const MagicInputComponent = ((0, jsx_runtime_1.jsxs)(Wrapper_1.Wrapper.Input, { children: [(0, jsx_runtime_1.jsx)(Control_1.Control, { ...inputProps, ref: (0, react_merge_refs_1.mergeRefs)([controlRef, ref]), type: type, className: `magic-input ${className ? className : 'form-control'}`, onChange: handleControlChange, onKeyDown: handleControlKeyDown, onClick: handleControlClick, onBlur: handleControlBlur, onFocus: handleControlFocus.bind(controlRef.current?.value), iconPosition: type === 'select' ? 'start' : iconPosition, autoComplete: 'false', "aria-autocomplete": "none", defaultValue: defaultValue, style: styles.control }), type === 'select' &&
                (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-down", onClick: () => {
                        controlRef.current?.focus();
                        run.current.clear();
                        setShowSuggestions(!showSuggestions);
                    }, style: styles.select }), (showSuggestions && react_1.Children.count(filtered) > 0) ? ((0, jsx_runtime_1.jsx)(Wrapper_1.Wrapper.Suggestions, { children: react_1.Children.map(filtered, child => (0, react_1.cloneElement)(child, {
                    onClick: () => {
                        controlRef.current.value = child.props.children;
                        controlRef.current?.focus();
                        setShowSuggestions(false);
                    }
                })) })) : null] }));
    return (labelId ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "w-100 d-flex flex-column gap-1 p-0", children: [LabelComponent, MagicInputComponent] }) }))
        : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: MagicInputComponent })));
});
exports.default = MagicInput;

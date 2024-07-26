"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// React
const react_1 = require("react");
// React-Bootstrap
// Project's components
const Control_1 = require("./Control");
const Wrapper_1 = require("./Wrapper");
// Utils
const delay_1 = require("../../utils/delay");
// Hooks
const react_merge_refs_1 = require("react-merge-refs");
const Icon_1 = require("../Icon");
const normalizeString_1 = require("../../utils/normalizeString");
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
exports.MagicInput = (0, react_1.forwardRef)(function (props, ref) {
    // Extract the component props and separate them from the native <input> element properties
    const { onChange, onKeyDown, onBlur, onFocus, size, defaultValue, children, type, iconPosition, className, addTag, ...inputProps } = props;
    /**
     * ============================== [STATES] ==============================
     * 1 - State to store if the list of suggestions will be shown or not
     * 2 - State to store the list of suggestions
     */
    const [showSuggestions, setShowSuggestions] = (0, react_1.useState)();
    const [filtered, setFiltered] = (0, react_1.useState)(children);
    /**
     * ============================== [REFS] ==============================
     * 1 - Ref to hide suggestions on a given delay;
     * 2 - Control Input Ref
     */
    const run = (0, react_1.useRef)((0, delay_1.delay)(500));
    const controlRef = (0, react_1.useRef)({});
    /**
     * ============================== [EVENT HANDLERS] ==============================
     */
    function handleControlChange(e) {
        if (type !== "select") {
            const { value } = e.currentTarget;
            if (onChange)
                onChange(e);
            const ns = (str) => (0, normalizeString_1.normalizeString)(str, { lowerCase: true });
            if (children && value && value !== "") {
                setFiltered(() => {
                    if (Array.isArray(children)) {
                        return [
                            ...children.filter((child) => child.props?.searchValue
                                ?
                                    ns(child.props.searchValue)
                                        .includes(ns(value))
                                :
                                    ns(child.props.children)
                                        .includes(ns(value))),
                        ];
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
                [];
            }
        }
    }
    function handleControlKeyDown(e) {
        if (type === "select" && e.key !== "Tab") {
            e.preventDefault();
        }
        switch (e.key) {
            case "Enter": {
                if (showSuggestions && filtered) {
                    e.preventDefault();
                    let child;
                    if (Array.isArray(filtered)) {
                        child = filtered[0];
                    }
                    else {
                        child = filtered;
                    }
                    setShowSuggestions(false);
                    if (onChange)
                        onChange(e);
                }
                break;
            }
        }
        if (onKeyDown) {
            onKeyDown(e);
            controlRef.current.focus();
        }
    }
    function handleControlBlur(e) {
        run.current.execute(function () {
            setShowSuggestions(false);
        });
        if (onBlur)
            onBlur(e);
    }
    function handleControlClick(e) {
        run.current.clear();
        setShowSuggestions(!showSuggestions);
    }
    function handleControlFocus(e) {
        if (children || (type === "number" && e.target.value !== this)) {
            if (onChange)
                onChange(e);
        }
        if (onFocus)
            onFocus(e);
    }
    /**
     * ============================== [CSS Inline Styles] ==============================
     */
    const styles = {
        control: {
            caretColor: type === "select" ? "transparent" : "initial",
            cursor: type === "select" ? "pointer" : "initial",
            background: !inputProps.disabled ? "transparent" : "revert-layer",
            appearance: type === "number" ? "none" : "initial",
            MozAppearance: type === "number" ? "none" : "initial",
            ...inputProps.style,
        },
        select: {
            position: "absolute",
            cursor: "pointer",
            paddingRight: "0.5rem",
            right: 0,
            zIndex: 1,
        },
        number: {
            display: "grid",
            height: "100%",
            color: "white",
            position: "absolute",
            alignItems: "center",
            right: 0,
            fontSize: "0.6rem",
            padding: "0.2rem 0.5rem",
        },
    };
    return ((0, jsx_runtime_1.jsxs)(Wrapper_1.Wrapper.Input, { children: [(0, jsx_runtime_1.jsx)(Control_1.Control, { ...inputProps, ref: (0, react_merge_refs_1.mergeRefs)([controlRef, ref]), type: type, className: className ? className : "form-control", onChange: handleControlChange, onKeyDown: handleControlKeyDown, onClick: handleControlClick, onBlur: handleControlBlur, onFocus: handleControlFocus.bind(controlRef.current?.value), iconPosition: type === "select" ? "start" : iconPosition, autoComplete: "false", "aria-autocomplete": "none", defaultValue: defaultValue, style: styles.control }), type === "select" && ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevron-down", onClick: () => {
                    controlRef.current.focus();
                    run.current.clear();
                    setShowSuggestions(!showSuggestions);
                }, style: styles.select })), (showSuggestions && children && (Array.isArray(filtered) && filtered.length) > 0) && ((0, jsx_runtime_1.jsx)(Wrapper_1.Wrapper.Suggestions, { children: react_1.Children.map(filtered, (child, index) => (0, react_1.cloneElement)(child, {
                    children: ((0, jsx_runtime_1.jsx)("span", { className: "d-flex flex-row align-items-center gap-1", style: { paddingBlock: "0.20rem" }, children: child.props?.customChildren || child.props.children })),
                    key: typeof child.props.children === "string" ? child.props.children.replaceAll(" ", "") : index,
                    onClick: (e) => {
                        child.props?.onClick && child.props.onClick(e);
                        if (addTag) {
                            addTag(child.props?.formValue || child.props.children, true);
                        }
                        else {
                            controlRef.current.value = child.props?.searchValue || child.props.children;
                            controlRef.current.focus();
                        }
                        setShowSuggestions(false);
                    },
                })) }))] }));
});

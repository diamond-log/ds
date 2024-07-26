'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagicTagInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Chip_1 = require("../Chip");
const MagicInput_1 = require("../MagicInput");
const react_merge_refs_1 = require("react-merge-refs");
const Icon_1 = require("../Icon");
const utils_1 = require("../../utils");
exports.MagicTagInput = (0, react_1.forwardRef)(function ({ labelClassName, intltextposition, labelId, allowAddNewTags, as, minLength = 2, maxLength = 30, maxTags, ...props }, ref) {
    const { placeholder, type, children, dictionary, ...otherProps } = props;
    const [tags, setTags] = (0, react_1.useState)(new Map());
    const hiddenInputRef = (0, react_1.useRef)();
    const magicInputRef = (0, react_1.useRef)();
    function addTag(value, isFormValue) {
        if (maxTags && tags.size === maxTags)
            return;
        // console.log({value, isFormValue, children})
        if (isFormValue || ((value !== '' && (value.length >= minLength && value.length <= maxLength)) || !allowAddNewTags)) {
            const ns = (str) => (0, utils_1.normalizeString)(str, { lowerCase: true });
            const matchedChildren = react_1.Children
                .map(children, child => (ns(child.props?.children)?.includes(ns(value)) ||
                (isFormValue
                    ? ns(child.props?.formValue)?.includes(ns(value))
                    : ns(child.props?.searchValue)?.includes(ns(value)))) && child)
                .find(child => child && !tags.has(child.props?.formValue || child.props?.children));
            // console.log({matchedChildren})
            if (matchedChildren || allowAddNewTags) {
                const updatedMap = new Map(tags);
                if (allowAddNewTags) {
                    if (isFormValue || ns(value) === ns(matchedChildren?.props?.searchValue)) {
                        updatedMap.set(matchedChildren?.props?.formValue || matchedChildren?.props.children, matchedChildren?.props?.customChildren || matchedChildren?.props.children);
                    }
                    else {
                        updatedMap.set(value, value);
                    }
                }
                else {
                    updatedMap.set(matchedChildren?.props?.formValue || matchedChildren?.props.children, matchedChildren?.props?.customChildren || matchedChildren?.props.children);
                }
                setTags(updatedMap);
                return true;
            }
            if (hiddenInputRef.current) {
                hiddenInputRef.current.focus();
            }
            if (magicInputRef.current) {
                setTimeout(() => {
                    magicInputRef.current.focus();
                }, 1);
            }
        }
    }
    function handleMagicInputKeyDown(e) {
        if (e.currentTarget.value.length === 0)
            return;
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const { value } = e.currentTarget;
            const added = addTag(value);
            if (added)
                e.currentTarget.value = '';
            else
                e.currentTarget.value = value;
            if (added) {
                setTimeout(() => {
                    magicInputRef.current.focus();
                }, 1);
            }
        }
    }
    (0, react_1.useEffect)(() => {
        hiddenInputRef.current.value = [...tags.keys()].toString();
    }, [[...tags.keys()].toString()]);
    const hiddenInputProps = {
        ...otherProps,
        onFocus: (e) => {
            hiddenInputRef.current.value = [...tags.keys()].toString();
            if (otherProps.onChange)
                otherProps.onChange(e);
            if (otherProps.onFocus)
                otherProps.onFocus(e);
        },
        value: [...tags.keys()].toString(),
        style: {
            width: 0,
            maxWidth: 0,
            height: 0,
            maxHeight: 0,
            visibility: 'hidden',
            position: 'absolute',
            opacity: 0,
            zIndex: -1,
        },
        ref: (0, react_merge_refs_1.mergeRefs)([hiddenInputRef, ref]),
        readOnly: true,
        tabIndex: -1
    };
    const DSMagicInputProps = {
        id: props.id,
        onKeyDown: handleMagicInputKeyDown,
        type,
        placeholder: dictionary?.[(0, utils_1.idToIndex)(props.id)] || placeholder,
        ref: magicInputRef,
        className: 'd-input-tag',
        addTag
    };
    const wrapperStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
        backgroundColor: 'white',
        border: '0.1rem solid #ddd',
        borderRadius: '0.375rem',
        padding: '0.375rem',
        width: '100%',
        ...props.style
    };
    // const tagsWrapperStyle: React.CSSProperties = {
    // 	display: 'flex',
    // 	flexWrap: 'wrap',
    // 	gap: '0.25rem'
    // }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-100 d-flex flex-column gap-1 p-0", children: [labelId && (0, jsx_runtime_1.jsx)("label", { htmlFor: props.id, className: labelClassName, children: dictionary[(0, utils_1.idToIndex)(labelId)] }), (0, jsx_runtime_1.jsxs)("div", { style: wrapperStyle, className: props.className, onClick: (e) => magicInputRef.current.focus(), children: [tags.size > 0 &&
                        [...tags.entries()].map(([key, renderChildren]) => ((0, jsx_runtime_1.jsxs)(Chip_1.Chip, { className: "bg-gray-100 border border-gray-400 text-truncate", children: [renderChildren, (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "x", className: "cursor-pointer", variant: "gray-600", size: "2", onClick: (e) => {
                                        setTags(prev => {
                                            const updatedMap = new Map(prev);
                                            updatedMap.delete(key);
                                            setTimeout(() => {
                                                hiddenInputRef.current.focus();
                                            }, 1);
                                            return updatedMap;
                                        });
                                    } })] }, key + 'Key'))), (0, jsx_runtime_1.jsx)("input", { ...hiddenInputProps, value: [...tags.keys()].toString() }), (0, jsx_runtime_1.jsx)(MagicInput_1.MagicInput, { ...DSMagicInputProps, children: react_1.Children.map(children, (child) => {
                            if (![...tags.keys()].includes(child.props?.children || child.props?.formValue)) {
                                return child;
                            }
                        }) }, tags.size)] })] }));
});

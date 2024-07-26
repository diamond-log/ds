"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlElementFactory = IntlElementFactory;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const idToIndex_1 = require("../../utils/idToIndex");
const Button_1 = require("../Button");
const Input_1 = require("../Input");
const link_1 = __importDefault(require("next/link"));
const loremText_1 = require("../../utils/loremText");
const Textarea_1 = require("../Textarea");
const TagField_1 = require("../TagField");
const Select_1 = require("../Select");
;
;
;
;
;
function IntlElementFactory(dictionaryProp, form) {
    return (0, react_1.forwardRef)(({ ...allProps }, ref) => {
        const props = allProps;
        // if(!dictionaryProp) {
        // 	throw new Error(`Element '${allProps.as}' is missing dictionary property`);
        // }
        // if(!props.id && !props.labelId) {
        // 	throw new Error(`Element '${allProps.as}' is missing id property`, {
        // 		cause: props
        // 	});
        // }
        // if(
        // 	!form &&
        // 	!dictionaryProp?.[idToIndex(allProps.id)] &&
        // 	!dictionaryProp?.[idToIndex(props.labelId)]
        // ) {
        // 	throw new Error(`Property '${allProps.id}' not found in dictionary for element '${allProps.as}'`, {
        // 		cause: dictionaryProp
        // 	});
        // }
        // if(
        // 	form &&
        // 	!dictionaryProp?.[idToIndex(form)]?.[idToIndex(props.id)] &&
        // 	!dictionaryProp?.[idToIndex(form)]?.[idToIndex(props.labelId)]
        // ) {
        // 	throw new Error(`Property '${allProps.id || props.labelId}' of object '${form}' not found in dictionary for element '${allProps.as}'`, {
        // 		cause: dictionaryProp
        // 	});
        // }
        const testText = props?.testText;
        const variant = props?.variant;
        const className = props?.className;
        const intlText = testText
            ? ""
            : form
                ? dictionaryProp[(0, idToIndex_1.idToIndex)(form)][(0, idToIndex_1.idToIndex)(props?.id)]
                : dictionaryProp[(0, idToIndex_1.idToIndex)(props?.id)];
        const children = (() => {
            if (testText)
                return loremText_1.loremText.slice(...testText);
            if (props?.children) {
                const position = props.intltextposition;
                return position === "left" ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [intlText, " ", props.children] })
                    : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.children, " ", intlText] });
            }
            return intlText;
        })();
        const dictionary = (form ? dictionaryProp[(0, idToIndex_1.idToIndex)(form)] : dictionaryProp);
        switch (props.as) {
            case "button": {
                return (0, jsx_runtime_1.jsx)(Button_1.Button, { ...props, dictionary: dictionary });
            }
            case "input-tag": {
                return (0, jsx_runtime_1.jsx)(TagField_1.TagField, { ...props, dictionary: dictionary });
            }
            case "input": {
                return (0, jsx_runtime_1.jsx)(Input_1.Input, { ...props, ref: ref, dictionary: dictionary });
            }
            case "textarea": {
                return (0, jsx_runtime_1.jsx)(Textarea_1.Textarea, { ...props, ref: ref, dictionary: dictionary });
            }
            case "a": {
                const { as, ...linkProps } = props;
                return (0, jsx_runtime_1.jsx)(link_1.default, { ...linkProps, children, ref });
            }
            case "select": {
                return (0, jsx_runtime_1.jsx)(Select_1.Select, { ...props, dictionary: dictionary, ref: ref });
            }
            default: {
                return (0, react_1.createElement)(props.as, {
                    ...props,
                    children,
                    className: variant ? `${variant} ${className}` : className,
                    ref: ref,
                });
            }
        }
    });
}

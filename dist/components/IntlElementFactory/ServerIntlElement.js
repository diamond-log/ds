"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerIntlElement = ServerIntlElement;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const idToIndex_1 = require("../../utils/idToIndex");
const loremText_1 = require("../../utils/loremText");
function ServerIntlElement(dictionaryProp, form) {
    return (0, react_1.forwardRef)(({ ...allProps }, ref) => {
        const props = allProps;
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
        switch (props.as) {
            case "a": {
                const { as, ...linkProps } = props;
                return (0, jsx_runtime_1.jsx)(link_1.default, { ...linkProps, children, ref });
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

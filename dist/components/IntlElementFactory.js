"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlElementFactory = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const idToIndex_1 = require("../utils/idToIndex");
const Button_1 = require("./Button");
const Input_1 = require("./Input");
const link_1 = require("next/link");
const loremText_1 = require("../utils/loremText");
const Textarea_1 = require("./Textarea");
function IntlElementFactory(dictionary, form) {
    return (0, react_1.forwardRef)(({ as, testText, ...props }, ref) => {
        const variant = props?.variant;
        const className = props?.className;
        const intlText = testText ? "" : form
            ? dictionary[(0, idToIndex_1.idToIndex)(form)][(0, idToIndex_1.idToIndex)(props.id)]
            : dictionary[(0, idToIndex_1.idToIndex)(props.id)];
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
        switch (as) {
            case "button": {
                return (0, jsx_runtime_1.jsx)(Button_1.Button, { ...props, dictionary: form ? dictionary[(0, idToIndex_1.idToIndex)(form)] : dictionary });
            }
            case "input": {
                return (0, jsx_runtime_1.jsx)(Input_1.Input, { ...props, dictionary: form ? dictionary[(0, idToIndex_1.idToIndex)(form)] : dictionary, ref: ref });
            }
            case "textarea": {
                return (0, jsx_runtime_1.jsx)(Textarea_1.Textarea, { ...props, dictionary: form ? dictionary[(0, idToIndex_1.idToIndex)(form)] : dictionary });
            }
            case "a": {
                return (0, jsx_runtime_1.jsx)(link_1.default, { ...props, children, ref });
            }
            default: {
                return (0, react_1.createElement)(as, {
                    ...props,
                    children,
                    className: variant ? `${variant} ${className}` : className,
                    ref: ref,
                });
            }
        }
    });
}
exports.IntlElementFactory = IntlElementFactory;

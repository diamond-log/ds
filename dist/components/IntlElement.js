"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlElementFactory = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const idToIndex_1 = require("../utils/idToIndex");
function IntlElementFactory(dictionary) {
    return (0, react_1.forwardRef)((props, ref) => {
        const { as, ...finalProps } = props;
        const variant = props?.variant;
        const className = props?.className;
        const intlText = dictionary[(0, idToIndex_1.idToIndex)(props.id)];
        const children = (() => {
            if (props?.children) {
                const position = props.intltextposition;
                return position === "left" ?
                    (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.children, " ", intlText] })
                    : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [intlText, " ", props.children] });
            }
            return intlText;
        })();
        return (0, react_1.createElement)(props.as, {
            ...finalProps,
            children,
            className: variant ? `${variant} ${className}` : className,
            ref: ref,
        });
    });
}
exports.IntlElementFactory = IntlElementFactory;

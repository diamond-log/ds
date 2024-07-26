"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Textarea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const FormControl_1 = require("react-bootstrap/FormControl");
const idToIndex_1 = require("../utils/idToIndex");
const Textarea = ({ dictionary, ...props }) => {
    const intlText = dictionary?.[(0, idToIndex_1.idToIndex)(props.id)];
    const placeholder = (() => {
        if (props?.placeholder && intlText) {
            const position = props.intltextposition;
            return position === "left" ?
                (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [intlText, " ", props.placeholder] })
                : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [props.placeholder, " ", intlText] });
        }
        if (props?.placeholder)
            return props.placeholder;
        return intlText;
    })();
    return ((0, jsx_runtime_1.jsx)(FormControl_1.default, { ...props, as: "textarea", placeholder: placeholder }));
};
exports.Textarea = Textarea;

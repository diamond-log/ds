"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ValidationContext_1 = require("../../contexts/ValidationContext");
const utils_1 = require("../../utils");
const Button_1 = require("../Button");
const Input_1 = require("../Input");
const MagicInput_1 = __importDefault(require("../MagicInput"));
const Select_1 = require("../Select");
const TagField_1 = require("../TagField");
const Textarea_1 = require("../Textarea");
function ClientIntlElement(dictionaryProp, form) {
    return (0, react_1.forwardRef)(({ ...allProps }, ref) => {
        const props = allProps;
        const dictionary = (form ? dictionaryProp[(0, utils_1.idToIndex)(form)] : dictionaryProp);
        const name = props?.name;
        switch (props.as) {
            case "button": {
                return (0, jsx_runtime_1.jsx)(Button_1.Button, { ...props, dictionary: dictionary });
            }
            case "input-tag": {
                return ((0, jsx_runtime_1.jsx)(ValidationContext_1.ValidationProvider, { field: props.field, children: (0, jsx_runtime_1.jsx)(TagField_1.TagField, { ...props, dictionary: dictionary }) }));
            }
            case "input": {
                return ((0, jsx_runtime_1.jsx)(ValidationContext_1.ValidationProvider, { field: name, children: (0, jsx_runtime_1.jsx)(Input_1.Input, { ...props, ref: ref, dictionary: dictionary }) }));
            }
            case "textarea": {
                return ((0, jsx_runtime_1.jsx)(ValidationContext_1.ValidationProvider, { field: name, children: (0, jsx_runtime_1.jsx)(Textarea_1.Textarea, { ...props, ref: ref, dictionary: dictionary }) }));
            }
            case "select": {
                return ((0, jsx_runtime_1.jsx)(ValidationContext_1.ValidationProvider, { field: name, children: (0, jsx_runtime_1.jsx)(Select_1.Select, { ...props, dictionary: dictionary, ref: ref }) }));
            }
            case "magic-input": {
                return ((0, jsx_runtime_1.jsx)(ValidationContext_1.ValidationProvider, { field: name, children: (0, jsx_runtime_1.jsx)(MagicInput_1.default, { ...props, as: undefined, dictionary: dictionary, ref: ref }) }));
            }
        }
    });
}
exports.default = ClientIntlElement;

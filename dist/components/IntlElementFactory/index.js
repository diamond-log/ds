"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntlElementFactory = IntlElementFactory;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ClientIntlElement_1 = __importDefault(require("./ClientIntlElement"));
const ServerIntlElement_1 = require("./ServerIntlElement");
function IntlElementFactory(dictionaryProp, form) {
    return (0, react_1.forwardRef)(({ ...props }, ref) => {
        switch (props.as) {
            case "input-tag":
            case "input":
            case "textarea":
            case "select":
            case "magic-input":
            case "button": {
                const Node = (0, ClientIntlElement_1.default)(dictionaryProp, form);
                return (0, jsx_runtime_1.jsx)(Node, { ...props, ref: ref });
            }
            default: {
                const Node = (0, ServerIntlElement_1.ServerIntlElement)(dictionaryProp, form);
                return (0, jsx_runtime_1.jsx)(Node, { ...props, ref: ref });
            }
        }
    });
}

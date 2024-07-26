"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// React
const react_1 = require("react");
// Component
const react_2 = __importDefault(require("@fullcalendar/react"));
// Plugins
const bootstrap5_1 = __importDefault(require("@fullcalendar/bootstrap5"));
const daygrid_1 = __importDefault(require("@fullcalendar/daygrid"));
const interaction_1 = __importDefault(require("@fullcalendar/interaction"));
const timegrid_1 = __importDefault(require("@fullcalendar/timegrid"));
// Utils
const locales_all_1 = __importDefault(require("@fullcalendar/core/locales-all"));
exports.Calendar = (0, react_1.forwardRef)(({ ...props }, propRef) => {
    const innerRef = (0, react_1.useRef)(null);
    const ref = propRef || innerRef;
    return ((0, jsx_runtime_1.jsx)(react_2.default, { plugins: [daygrid_1.default, timegrid_1.default, interaction_1.default, bootstrap5_1.default], initialView: "dayGridMonth", editable: true, selectable: true, selectMirror: true, dayMaxEvents: true, ...props, ref: ref, locales: locales_all_1.default }));
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const Item = ({ index, id, children, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Draggable, { draggableId: id, index: index, children: (provided, snapshot) => ((0, jsx_runtime_1.jsx)("div", { ...props, ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, style: {
                ...provided.draggableProps.style,
                ...props.style
            }, children: typeof children === "function" ? children({ snapshot }) : children })) }));
};
exports.Item = Item;

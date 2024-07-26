"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const Column = ({ column, index, children, itemWrapperProps, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Draggable, { draggableId: column.id, index: index, children: provided => ((0, jsx_runtime_1.jsxs)("div", { ...props, ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, style: {
                ...provided.draggableProps.style,
                ...props.style
            }, children: [column.title, (0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Droppable, { droppableId: column.id, type: "item", children: (provided, snapshot) => ((0, jsx_runtime_1.jsxs)("div", { ...itemWrapperProps?.({ snapshot }) || {}, ref: provided.innerRef, ...provided.droppableProps, children: [typeof children === "function" ? children({ snapshot }) : children, provided.placeholder] })) })] })) }));
};
exports.Column = Column;

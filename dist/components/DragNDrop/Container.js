"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const Context_1 = require("./Context");
const Container = ({ children, droppableId = "all-column", direction = "horizontal", ...props }) => {
    const dndData = (0, Context_1.useDragNDropContext)();
    const columnOrder = dndData.columnOrder.map((columnId, columnIndex) => {
        const column = dndData.columns[columnId];
        const items = column.itemIds.map((itemId, index) => ({ ...dndData.items[itemId], index }));
        return { column: { ...column, index: columnIndex }, items };
    });
    return ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.Droppable, { type: "column", droppableId: droppableId, direction: direction, children: (provided, snapshot) => ((0, jsx_runtime_1.jsxs)("div", { ...props, style: props.style?.({ snapshot }) || {}, ...provided.droppableProps, ref: provided.innerRef, children: [children(columnOrder, { snapshot }), provided.placeholder] })) }));
};
exports.Container = Container;

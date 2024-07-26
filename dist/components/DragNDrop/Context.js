"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDragNDropContext = exports.DragNDropContext = void 0;
const react_1 = require("react");
exports.DragNDropContext = (0, react_1.createContext)({ items: {}, columns: {}, columnOrder: [], set: () => { } });
const useDragNDropContext = () => {
    const context = (0, react_1.useContext)(exports.DragNDropContext);
    function onAddItem(columnId, value) {
        context.set(prev => {
            const newState = {
                ...prev,
                items: {
                    ...prev.items,
                    [`item-${Object.keys(prev.items).length + 1}`]: {
                        id: `item-${Object.keys(prev.items).length + 1}`,
                        value
                    }
                },
                columns: {
                    ...prev.columns,
                    [columnId]: {
                        ...prev.columns[columnId],
                        itemIds: [
                            ...prev.columns[columnId].itemIds,
                            `item-${Object.keys(prev.items).length + 1}`
                        ]
                    }
                }
            };
            return newState;
        });
    }
    function onRemoveItem(columnId, item) {
        context.set(prev => {
            const newState = {
                ...prev,
                items: {},
                columns: {
                    ...prev.columns,
                    [columnId]: {
                        ...prev.columns[columnId],
                        itemIds: prev.columns[columnId].itemIds.filter(id => id !== item.id)
                    }
                }
            };
            newState.items = Object.entries(prev.items).reduce((acc, [key, value]) => {
                if (key !== item.id) {
                    acc[key] = value;
                }
                return acc;
            }, {});
            //   console.log({newState});
            return newState;
        });
    }
    function onAddNewColumn(title) {
        context.set(prev => ({
            ...prev,
            columns: {
                ...prev.columns,
                [`column-${Object.keys(prev.columns).length + 1}`]: {
                    id: `column-${Object.keys(prev.columns).length + 1}`,
                    title: title || '',
                    itemIds: []
                }
            },
            columnOrder: [...prev.columnOrder, `column-${Object.keys(prev.columns).length + 1}`]
        }));
    }
    return { ...context, onAddItem, onRemoveItem, onAddNewColumn };
};
exports.useDragNDropContext = useDragNDropContext;

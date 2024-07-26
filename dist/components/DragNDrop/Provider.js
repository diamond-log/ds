"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const Context_1 = require("./Context");
/**
 * @example
 * <Provider initialValues={...}>
  * <Container>
    {
      (columnOrder => columnOrder.map(({ column, items }) => (
        <Column key={column.id} column={column} index={column.index}>
          {
            (({ snapshot }) => (
              items.map(item => (
                <Item key={item.id} id={item.id} index={item.index}>
                  {({ snapshot }) => (
                    <div> ... </div>
                  )}
                </Item>
              ))
            ))
          }
        </Column>
      )))
    }
  * </Container>
* </Provider>
**/
const Provider = ({ children, values: valuesProps, onColumnReorder, onItemReorder }) => {
    const transformValues = (values) => values.reduce((acc, { column, values, valuesIdFieldName = "id" }) => {
        let itemIds = [];
        const items = values.reduce((itemAcc, value, index) => {
            const keyIndex = (Object.keys(acc.items).length + 1) + index;
            // console.log({itemAcc, acc, "Object.keys + 1:": Object.keys(acc.items).length + 1, index, keyIndex});
            const id = value?.[valuesIdFieldName] || `item-${keyIndex}`;
            itemIds.push(id);
            itemAcc[id] = {
                id,
                value
            };
            return itemAcc;
        }, {});
        const columnKeyIndex = (Object.keys(acc.columns).length + 1);
        const columnId = column?.id || `column-${columnKeyIndex}`;
        const data = {
            ...acc,
            items: {
                ...acc.items,
                ...items
            },
            columns: {
                ...acc.columns,
                [columnId]: {
                    id: columnId,
                    title: column.title,
                    itemIds
                }
            },
            columnOrder: [...acc.columnOrder, columnId]
        };
        return data;
    }, { items: {}, columns: {}, columnOrder: [] });
    (0, react_1.useEffect)(() => {
        setDndData(() => transformValues(valuesProps));
    }, [valuesProps]);
    const [dndData, setDndData] = (0, react_1.useState)(transformValues(valuesProps));
    const onDragEnd = (props) => {
        const { destination, source, draggableId, type } = props;
        if (!destination)
            return;
        if (destination.droppableId === source.droppableId &&
            destination.index === source.index)
            return;
        const start = dndData.columns[source.droppableId];
        const end = dndData.columns[destination.droppableId];
        if (type === "column") {
            /* - Reorder column - */
            // console.log(destination, source, draggableId);
            const newOrder = [...dndData.columnOrder];
            newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, draggableId);
            setDndData(() => ({
                ...dndData,
                columnOrder: newOrder
            }));
            onColumnReorder && onColumnReorder({
                columnId: draggableId,
                columnIndex: destination.index,
                columnOrder: newOrder,
                movedFrom: { containerId: source.droppableId, index: source.index },
                movedTo: { containerId: destination.droppableId, index: destination.index },
            });
            return;
        }
        const sourceColumnIndex = dndData.columnOrder.indexOf(source.droppableId);
        const destinationColumnIndex = dndData.columnOrder.indexOf(destination.droppableId);
        if (start.id === end.id) {
            /* - Reorder items in same column - */
            const column = dndData.columns[source.droppableId];
            const itemIds = [...column.itemIds];
            itemIds.splice(source.index, 1);
            itemIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...column,
                itemIds
            };
            setDndData({
                ...dndData,
                columns: {
                    ...dndData.columns,
                    [column.id]: newColumn
                }
            });
            onItemReorder && onItemReorder({
                itemId: draggableId,
                itemIndex: destination.index,
                movedFrom: { columnId: source.droppableId, columnIndex: sourceColumnIndex, itemIndex: source.index },
                movedTo: { columnId: destination.droppableId, columnIndex: destinationColumnIndex, itemIndex: destination.index },
            });
            return;
        }
        /* - Reorder items between differents columns - */
        const startItemIds = [...start.itemIds];
        const endItemIds = [...end.itemIds];
        startItemIds.splice(source.index, 1);
        endItemIds.splice(destination.index, 0, draggableId);
        const newStartColumn = {
            ...start,
            itemIds: startItemIds
        };
        const endItemColumn = {
            ...end,
            itemIds: endItemIds
        };
        setDndData({
            ...dndData,
            columns: {
                ...dndData.columns,
                [start.id]: newStartColumn,
                [end.id]: endItemColumn
            }
        });
        onItemReorder && onItemReorder({
            itemId: draggableId,
            itemIndex: destination.index,
            movedFrom: { columnId: source.droppableId, columnIndex: sourceColumnIndex, itemIndex: source.index },
            movedTo: { columnId: destination.droppableId, columnIndex: destinationColumnIndex, itemIndex: destination.index },
        });
        // console.log("new starter", dndData);
        // console.log(destination, source, draggableId);
    };
    return ((0, jsx_runtime_1.jsx)(react_beautiful_dnd_1.DragDropContext, { onDragEnd: onDragEnd, children: (0, jsx_runtime_1.jsx)(Context_1.DragNDropContext.Provider, { value: { ...dndData, set: setDndData }, children: children }) }));
};
exports.Provider = Provider;

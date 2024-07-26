import { useEffect, useState } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { DragNDropContext } from "./Context";
import { ReactNode, PropsWithChildren } from "react";

// const DataStructure = {
//   items: {
//     "item-1": { id: "item-1", content: "I am item 1" },
//     "item-2": { id: "item-2", content: "I am item 2" },
//   },
//   columns: {
//     "column-1": {
//       id: "column-1",
//       title: "Todo",
//       itemIds: ["item-1", "item-2"],
//       value: any
//     },
//     "column-2": {
//       id: "column-2",
//       title: "In Progress",
//       itemIds: [],
//       value: any
//     }
//   },
//   columnOrder: ["column-1", "column-2"]
// };

export type DSDragNDropDataType = {
  items: {
    [key: string]: {
      id: string;
      value: any;
    };
  };
  columns: {
    [key: string]: {
      id: string;
      title: ReactNode;
      itemIds: string[];
    };
  };
  columnOrder: string[];
}

export type DSDragNDropProviderProps = PropsWithChildren<{
  values: {
    column: {
      id?: string;
      title: ReactNode;
    }
    values: unknown[]
    valuesIdFieldName?: string;
  }[];
  onColumnReorder: (actionProps: {
    columnId: string;
    columnIndex: number;
    columnOrder: string[];
    movedFrom: { containerId: string, index: number },
    movedTo: { containerId: string, index: number },
  }) => void;
  onItemReorder: (actionProps: {
    itemId: string;
    itemIndex: number;
    movedFrom: { columnId: string, columnIndex: number, itemIndex: number },
    movedTo: { columnId: string, columnIndex: number, itemIndex: number },
  }) => void;
}>;

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
export const Provider = ({ children, values: valuesProps, onColumnReorder, onItemReorder }: DSDragNDropProviderProps) => {

  const transformValues = (values: DSDragNDropProviderProps["values"]): DSDragNDropDataType => values.reduce((acc: DSDragNDropDataType, { column, values, valuesIdFieldName = "id" }) => {

    let itemIds: string[] = [];
    const items = values.reduce((itemAcc: DSDragNDropDataType["items"], value, index) => {
      const keyIndex = (Object.keys(acc.items).length + 1) + index;

      // console.log({itemAcc, acc, "Object.keys + 1:": Object.keys(acc.items).length + 1, index, keyIndex});

      const id = (value as Record<string, string>)?.[valuesIdFieldName] || `item-${keyIndex}`;
      itemIds.push(id);
      itemAcc[id] = {
        id,
        value
      };

      return itemAcc;
    }, {}) as DSDragNDropDataType["items"];

    const columnKeyIndex = (Object.keys(acc.columns).length + 1);
    const columnId = column?.id || `column-${columnKeyIndex}`;
    const data: DSDragNDropDataType = {
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
    }

    return data;
  }, { items: {}, columns: {}, columnOrder: [] });

  useEffect(() => {
    setDndData(() => transformValues(valuesProps));
  },[valuesProps]);

  const [dndData, setDndData] = useState<DSDragNDropDataType>(transformValues(valuesProps));

  const onDragEnd: OnDragEndResponder = (props) => {

    const { destination, source, draggableId, type } = props;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DragNDropContext.Provider value={{...dndData, set: setDndData}}>
        {children}
      </DragNDropContext.Provider>
    </DragDropContext>
  );
}
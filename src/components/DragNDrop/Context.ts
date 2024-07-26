import { createContext, useContext } from "react";
import { DSDragNDropDataType } from "./Provider";

export const DragNDropContext = createContext<DSDragNDropDataType & { set: React.Dispatch<React.SetStateAction<DSDragNDropDataType>> }>(
  { items: {}, columns: {}, columnOrder: [], set: () => {} }
);

export const useDragNDropContext = () => {
  const context = useContext(DragNDropContext);

  function onAddItem<T = unknown>(columnId: string, value: T) {
    context.set(prev => {
      const newState: DSDragNDropDataType = {
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

  function onRemoveItem(columnId: string, item: DSDragNDropDataType["items"][keyof DSDragNDropDataType["items"]]) {
    context.set(prev => {
      const newState: DSDragNDropDataType = {
        ...prev,
        items: {},
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            itemIds: prev.columns[columnId].itemIds.filter(
              id => id !== item.id
            )
          }
        }
      };

      newState.items = Object.entries(prev.items).reduce(
        (acc, [key, value]) => {
          if (key !== item.id) {
            acc[key] = value;
          }
          return acc;
        },
        {} as DSDragNDropDataType["items"]
      )

    //   console.log({newState});
      return newState;
    });
  }

  function onAddNewColumn(title?: string) {
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
}
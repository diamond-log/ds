import { ReactNode, PropsWithChildren } from "react";
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
};
export type DSDragNDropProviderProps = PropsWithChildren<{
    values: {
        column: {
            id?: string;
            title: ReactNode;
        };
        values: unknown[];
        valuesIdFieldName?: string;
    }[];
    onColumnReorder: (actionProps: {
        columnId: string;
        columnIndex: number;
        columnOrder: string[];
        movedFrom: {
            containerId: string;
            index: number;
        };
        movedTo: {
            containerId: string;
            index: number;
        };
    }) => void;
    onItemReorder: (actionProps: {
        itemId: string;
        itemIndex: number;
        movedFrom: {
            columnId: string;
            columnIndex: number;
            itemIndex: number;
        };
        movedTo: {
            columnId: string;
            columnIndex: number;
            itemIndex: number;
        };
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
export declare const Provider: ({ children, values: valuesProps, onColumnReorder, onItemReorder }: DSDragNDropProviderProps) => import("react/jsx-runtime").JSX.Element;

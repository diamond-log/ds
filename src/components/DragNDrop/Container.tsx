import { Droppable, DroppableProps, DroppableStateSnapshot } from "react-beautiful-dnd"
import { useDragNDropContext } from "./Context";

export type ContainerProps = {
    children: (
        columnOrder: {
            column: {
                id: string;
                index: number;
                title: React.ReactNode;
                itemIds: string[];
            };
            items: {
                id: string;
                index: number;
                value: unknown;
            }[];
        }[],
        droppableProps: {
            snapshot: DroppableStateSnapshot;
        }
    ) => React.ReactNode;
    style?: ( droppableProps: { snapshot: DroppableStateSnapshot } ) => React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "style"> & Partial<Pick<DroppableProps, "droppableId" | "direction">>;

export const Container = ({ children, droppableId = "all-column", direction = "horizontal", ...props }: ContainerProps) => {

    const dndData = useDragNDropContext();

    const columnOrder: Parameters<ContainerProps["children"]>[0] = dndData.columnOrder.map((columnId, columnIndex) => {
      const column = dndData.columns[columnId];
      const items = column.itemIds.map((itemId, index) => ({...dndData.items[itemId], index}));

      return { column: {...column, index: columnIndex}, items };
    });
    
    return (
        <Droppable
        type="column"
        droppableId={droppableId}
        direction={direction}
        >
            {(provided, snapshot) => (
                <div
                {...props}
                style={props.style?.({ snapshot }) || {}}
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                    {children(columnOrder, { snapshot })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
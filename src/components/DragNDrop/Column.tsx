import { Draggable, Droppable, DroppableStateSnapshot } from "react-beautiful-dnd";

export type DSDragNDropColumnProps = {
    column: {
        id: string;
        title: React.ReactNode
    };
    index: number;
    children: ( (props: {snapshot: DroppableStateSnapshot}) => React.ReactNode ) | React.ReactNode;
    itemWrapperProps?: (props: {snapshot: DroppableStateSnapshot} ) => React.HTMLAttributes<HTMLDivElement>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export const Column = ({ column, index, children, itemWrapperProps, ...props }: DSDragNDropColumnProps) => {
    return (
        <Draggable draggableId={column.id} index={index}>
            {provided => (
                <div
                {...props}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    ...provided.draggableProps.style,
                    ...props.style
                }}
                >
                    {column.title}
                    <Droppable droppableId={column.id} type="item">
                        {(provided, snapshot) => (
                            <div
                            {...itemWrapperProps?.({ snapshot }) || {}}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            >
                                {typeof children === "function" ? children({ snapshot }) : children}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
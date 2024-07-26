import { Draggable, DraggableStateSnapshot } from "react-beautiful-dnd";
import { DSDragNDropDataType } from "./Provider";

export type DSDragNDropItemProps = {
    index: number;
    id: string;
    children: ( ({ snapshot }: {
        snapshot: DraggableStateSnapshot;
    }) => React.ReactNode ) | React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;

export const Item = ({ index, id, children, ...props }: DSDragNDropItemProps) => {

    return (
        <Draggable
        draggableId={id}
        index={index}
        >
            {(provided, snapshot) => (
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
                    {typeof children === "function" ? children({ snapshot }) : children}
                </div>
            )}
        </Draggable>
    )
}
import { DroppableProps, DroppableStateSnapshot } from "react-beautiful-dnd";
export type ContainerProps = {
    children: (columnOrder: {
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
    }[], droppableProps: {
        snapshot: DroppableStateSnapshot;
    }) => React.ReactNode;
    style?: (droppableProps: {
        snapshot: DroppableStateSnapshot;
    }) => React.CSSProperties;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "style"> & Partial<Pick<DroppableProps, "droppableId" | "direction">>;
export declare const Container: ({ children, droppableId, direction, ...props }: ContainerProps) => import("react/jsx-runtime").JSX.Element;

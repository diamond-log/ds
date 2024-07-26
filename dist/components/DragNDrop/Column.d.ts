import { DroppableStateSnapshot } from "react-beautiful-dnd";
export type DSDragNDropColumnProps = {
    column: {
        id: string;
        title: React.ReactNode;
    };
    index: number;
    children: ((props: {
        snapshot: DroppableStateSnapshot;
    }) => React.ReactNode) | React.ReactNode;
    itemWrapperProps?: (props: {
        snapshot: DroppableStateSnapshot;
    }) => React.HTMLAttributes<HTMLDivElement>;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
export declare const Column: ({ column, index, children, itemWrapperProps, ...props }: DSDragNDropColumnProps) => import("react/jsx-runtime").JSX.Element;

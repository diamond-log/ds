import { DraggableStateSnapshot } from "react-beautiful-dnd";
export type DSDragNDropItemProps = {
    index: number;
    id: string;
    children: (({ snapshot }: {
        snapshot: DraggableStateSnapshot;
    }) => React.ReactNode) | React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">;
export declare const Item: ({ index, id, children, ...props }: DSDragNDropItemProps) => import("react/jsx-runtime").JSX.Element;

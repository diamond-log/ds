import { DSDragNDropDataType } from "./Provider";
export declare const DragNDropContext: import("react").Context<DSDragNDropDataType & {
    set: React.Dispatch<React.SetStateAction<DSDragNDropDataType>>;
}>;
export declare const useDragNDropContext: () => {
    onAddItem: <T = unknown>(columnId: string, value: T) => void;
    onRemoveItem: (columnId: string, item: DSDragNDropDataType["items"][keyof DSDragNDropDataType["items"]]) => void;
    onAddNewColumn: (title?: string) => void;
    items: {
        [key: string]: {
            id: string;
            value: any;
        };
    };
    columns: {
        [key: string]: {
            id: string;
            title: import("react").ReactNode;
            itemIds: string[];
        };
    };
    columnOrder: string[];
    set: React.Dispatch<React.SetStateAction<DSDragNDropDataType>>;
};

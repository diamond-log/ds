'use client';

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider as Provider } from "react-dnd";
import { ReactNode } from "react";

export const DndProvider = ({ children }: { children: ReactNode }) => {

    const windowIsDefined = typeof window !== 'undefined' ? window : {}

    return (
        <Provider backend={HTML5Backend} context={windowIsDefined}>
            {children}
        </Provider>
    )
}
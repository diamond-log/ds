// React
import { forwardRef, useRef } from 'react';

// Component
import FullCalendar from '@fullcalendar/react';

// Plugins
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from '@fullcalendar/timegrid';

// Types
import { CalendarOptions } from '@fullcalendar/core';

// Utils
import allLocales from '@fullcalendar/core/locales-all';

export type DSCalendarProps = {
} & CalendarOptions;

export const Calendar = forwardRef<FullCalendar, DSCalendarProps>(({...props}, propRef) => {

    const innerRef = useRef<FullCalendar>(null);

    const ref = (propRef as React.MutableRefObject<FullCalendar>) || innerRef;

    return (
        <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin ]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        {...props}
        ref={ref}
        locales={allLocales}
        />
    )
})
import React from "react";
import {Segment} from "semantic-ui-react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = (props) => {
    return (
        <Segment>
            <h3>{props.title}</h3>
            <FullCalendar plugins={[timeGridPlugin]}
                          initialView="timeGridWeek"
                          allDaySlot={false}
                          slotMinTime={"08:00:00"}
                          slotMaxTime={"17:00:00"}
                          dayHeaderFormat={{weekday: 'short'}}
                          slotLabelFormat={{hour: '2-digit', minute: '2-digit', hour12: true}}
                          expandRows
                          // hiddenDays={[5, 6]}
                          headerToolbar={false}
                          events={props.events}
            />
        </Segment>
    )


}

export default Calendar;
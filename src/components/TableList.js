import {Button, Icon, Segment} from "semantic-ui-react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React from "react";
import {Link} from "react-router-dom";

class TableList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/">
                    <Button primary>
                        <Button.Content><Icon name='arrow left'/></Button.Content>
                    </Button>
                </Link>
                <Segment>
                    <h2>Group 1</h2>
                    <FullCalendar plugins={[timeGridPlugin]}
                                  initialView="timeGridWeek"
                                  allDaySlot={false}
                                  slotMinTime={"08:00:00"}
                                  slotMaxTime={"17:00:00"}
                                  dayHeaderFormat={{weekday: 'short'}}
                                  slotLabelFormat={{hour: '2-digit', minute: '2-digit', hour12: true}}
                                  expandRows
                                  hiddenDays={[5, 6]}
                                  headerToolbar={false}
                    />
                </Segment>
            </React.Fragment>
        );
    }
}

export default TableList;

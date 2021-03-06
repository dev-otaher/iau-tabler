import React from "react";
import {Button, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Calendar from "./Calendar";

class TableList extends React.Component {

    convertTo24 = (time) => {
        const digits = time.trim().match(/(\d+):/m);
        let hours = parseInt(digits[1]);
        if (hours === 12) {
            hours = 0;
        }

        if (time.match(/PM/gi)) {
            hours += 12;
        }

        if (hours < 10)
            hours = `0${hours.toString()}`

        return time.replace(digits[1].toString(), hours.toString()).replace(/AM/i, "").replace(/PM/i, "");
    }

    getDayIndex = (day) => {
        switch (day.toLowerCase()) {
            case 'su':
                return 0;
            case 'mo':
                return 1;
            case 'tu':
                return 2;
            case 'we':
                return 3;
            case 'th':
                return 4;
            case 'fr':
                return 5;
            case 'sa':
                return 6;
            default:
                return;
        }
    }

    createEvent = (title, day, startTime, endTime) => {
        return {
            allDay: false,
            title: title,
            daysOfWeek: [`${this.getDayIndex(day)}`],
            startTime: `${this.convertTo24(startTime)}:00`,
            endTime: `${this.convertTo24(endTime)}:00`,
        }
    }

    renderTables = () => {
        return this.props.groups.map(({title, classes}, index) => {
            let events = [];
            classes.forEach(c => {
                c.daysAndTimes.forEach(dt => {
                    if (dt !== "TBA") {
                        const [days, start, , end] = dt.split(' ');
                        days.match(/[A-Z][a-z]/g).forEach((day, index) => {
                            let title = c.instructors.length > 0 ? `${c.courseTitle} (${c.instructors[index]})` : c.courseTitle;
                            events.push(this.createEvent(title, day, start, end));
                        })
                    }
                })
            })
            return <Calendar key={index} title={title} events={events}/>
        })
    }

    render() {
        if (!this.props.groups)
            return <div>No groups found! <Link to="/">Try again...</Link></div>;
        return (
            <>
                <Link to="/">
                    <Button primary>
                        <Button.Content><Icon name='arrow left'/></Button.Content>
                    </Button>
                </Link>
                {this.renderTables()}
            </>
        );
    }

}

export default TableList;

import {Button, Icon} from "semantic-ui-react";
import React from "react";
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

    renderTables = () => {
        return this.props.groups.map(({title, classes}, index) => {
            let events = [];
            classes.map(c => {
                c.daysAndTimes.map(dt => {
                    const [days, start, , end] = dt.split(' ');
                    days.match(/[A-Z][a-z]/g).map(day => {
                        events.push({
                            allDay: false,
                            title: c.courseTitle,
                            daysOfWeek: [`${this.getDayIndex(day)}`],
                            startTime: `${this.convertTo24(start)}:00`,
                            endTime: `${this.convertTo24(end)}:00`,
                        })
                    })
                })
            })
            return <Calendar key={index} title={title} events={events}/>
        })
    }

    render() {
        if (!this.props.groups)
            return <div>No groups found! <Link to="/">Try again...</Link></div>;

        return (
            <React.Fragment>
                <Link to="/">
                    <Button primary>
                        <Button.Content><Icon name='arrow left'/></Button.Content>
                    </Button>
                </Link>
                {this.renderTables()}
            </React.Fragment>
        );
    }
}

export default TableList;

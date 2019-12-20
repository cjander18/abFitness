import React, { Component } from 'react';
import { addDays, addMonths, format, startOfWeek, subMonths } from 'date-fns';
import CalendarDropdown from './CalendarDropdown';
import { calendarTypes } from '../../utils/Constants';

export default class CalendarHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
        };
    }

    render() {
        return <div className="calendarHeader">{this.renderHeader()}</div>;
    }

    renderHeader() {
        const dateFormat = 'MMMM yyyy';
        return (
            <div>
                <div className="header row flex-middle">
                    <div className="col col-start">
                        <span className="icon" onClick={this.prevMonth}>
                            chevron_left
                        </span>
                        <span className="icon" onClick={this.nextMonth}>
                            chevron_right
                        </span>
                    </div>
                    <div className="col">
                        <span>
                            {format(this.state.currentMonth, dateFormat)}
                        </span>
                    </div>
                    <div className="col col-end">
                        <CalendarDropdown
                            setCalendarType={this.props.setCalendarType}
                            calendarType={this.props.calendarType}
                        ></CalendarDropdown>
                    </div>
                </div>
                {this.renderDays()}
            </div>
        );
    }

    renderDays() {
        let dateFormat = 'iiii';
        const days = [];

        if (this.props.calendarType !== calendarTypes.Day) {
            let startDate = startOfWeek(this.state.currentMonth);
            for (let i = 0; i < 7; i++) {
                days.push(
                    <div className="col col-center" key={i}>
                        {format(addDays(startDate, i), dateFormat)}
                    </div>
                );
            }
        } else if (this.props.calendarType === calendarTypes.Day) {
            dateFormat = 'iiii MMM do';
            days.push(
                <div className="col col-center" key="0">
                    {format(this.props.selectedDate, dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1),
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1),
        });
    };
}

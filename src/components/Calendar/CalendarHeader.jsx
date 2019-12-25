import React, { Component } from 'react';
import { addDays, format, startOfMonth, startOfWeek } from 'date-fns';
import CalendarDropdown from './CalendarDropdown';
import { calendarTypes } from '../../utils/Constants';

export default class CalendarHeader extends Component {
    render() {
        return <div className="calendarHeader">{this.renderHeader()}</div>;
    }

    renderHeader() {
        const dateFormat = 'MMMM yyyy';
        return (
            <div>
                <div className="header row flex-middle">
                    <div className="col col-start">
                        <span className="icon" onClick={this.props.prevMonth}>
                            chevron_left
                        </span>
                        <span className="icon" onClick={this.props.nextMonth}>
                            chevron_right
                        </span>
                    </div>
                    <div className="col">
                        <span>
                            {format(
                                startOfMonth(this.props.selectedDate),
                                dateFormat
                            )}
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
            let startDate = startOfWeek(startOfMonth(this.props.selectedDate));
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
}

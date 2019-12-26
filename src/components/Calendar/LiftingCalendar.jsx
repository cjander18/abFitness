import React, { Component } from 'react';
import { Person } from 'blockstack';
import CalendarDates from './CalendarDates';
import CalendarHeader from './CalendarHeader';
import CalendarPopup from './CalendarPopup';
import { calendarTypes } from '../../utils/Constants';
import { appConfig, BlockstackUtils } from '../../utils/Blockstack';
import { UserSession } from 'blockstack';
import { addMonths, subMonths } from 'date-fns';

const avatarFallbackImage =
    'https://s3.amazonaws.com/onename/avatar-placeholder.png';

const defaultCalendars = [
    {
        name: 'Personal',
        color: '#d2050d',
        dragColor: '#8e050d',
    },
    {
        name: 'Work',
        color: '#1b990d',
        dragColor: '#1b680d',
    },
];

export default class LiftingCalendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            person: {
                name() {
                    return 'Anonymous';
                },
                avatarUrl() {
                    return avatarFallbackImage;
                },
            },
            selectedDate: new Date(),
            selectedHour: '',
            calendarType: calendarTypes.Month,
            showPopup: false,
        };

        this.userSession = new UserSession({ appConfig });
    }

    render() {
        return (
            <div className="calendar">
                <CalendarHeader
                    calendarType={this.state.calendarType}
                    nextMonth={this.nextMonth}
                    prevMonth={this.prevMonth}
                    selectedDate={this.state.selectedDate}
                    setCalendarType={this.setCalendarType}
                    updateDateRange={this.props.updateDateRange}
                ></CalendarHeader>
                <CalendarDates
                    calendarType={this.state.calendarType}
                    selectDate={this.selectDate}
                    selectHour={this.selectHour}
                    selectedDate={this.state.selectedDate}
                    selectedHour={this.state.selectedHour}
                    updateDateRange={this.props.updateDateRange}
                    showPopup={this.state.showPopup}
                    togglePopup={this.togglePopup}
                    exercises={this.props.exercises}
                ></CalendarDates>
                <div
                    style={{ display: this.state.showPopup ? 'block' : 'none' }}
                >
                    <CalendarPopup
                        closePopup={this.togglePopup}
                        selectedDate={this.state.selectedDate}
                        selectedHour={this.state.selectedHour}
                    ></CalendarPopup>
                </div>
                {/* {this.state.showPopup ? (
                    <CalendarPopup
                        text='Click "Close Button" to hide popup'
                        closePopup={() =>
                            this.togglePopup(this.state.showPopup)
                        }
                        selectedDate={this.state.selectedDate}
                        selectedHour={this.state.selectedHour}
                    />
                ) : null} */}
            </div>
        );
    }

    componentWillMount() {
        const { userSession } = this.props;
        this.setState({
            person: new Person(userSession.loadUserData().profile),
        });
        // }

        // componentDidMount() {
        BlockstackUtils.getCalendars()
            .then(calendars => {
                if (calendars.length === 0) calendars = defaultCalendars;

                this.setState({ calendars }, () => {
                    console.log('calendars set');
                    console.table(calendars);
                });
            })
            .catch(err => console.log(err));
    }

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup,
        });
    };

    nextMonth = () => {
        this.setState({
            selectedDate: addMonths(this.state.selectedDate, 1),
        });
    };

    prevMonth = () => {
        this.setState({
            selectedDate: subMonths(this.state.selectedDate, 1),
        });
    };

    setCalendarType = calendarType => {
        this.setState({ calendarType: calendarType.value }, () =>
            console.log(`Option selected:`, this.state.calendarType)
        );
    };

    selectHour = selectedHour => {
        this.setState({ selectedHour, showPopup: true }, () =>
            console.log(`Option selected:`, this.state.selectedHour)
        );
    };

    selectDate = selectedDate => {
        this.setState({ selectedDate }, () =>
            console.log(`Option selected:`, this.state.selectedDate)
        );
    };
}

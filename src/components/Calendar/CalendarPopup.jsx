import React, { Component } from 'react';
import { appConfig, calendarTypes } from './utils/Constants';
import { UserSession } from 'blockstack';

export default class CalendarPopup extends Component {
    constructor(props) {
        super(props);

        this.userSession = new UserSession({ appConfig });
    }

    render() {
        return (
            <div className="popup">
                <div className="popup\_inner">
                    <h1>
                        {this.props.selectedDate.toDateString()}{' '}
                        {this.props.selectedHour}
                    </h1>
                    <form>
                        <label>Title</label>
                        <input name="Title" type="text" />
                        <label>Guests</label>
                        <input name="Guests" type="text" />
                        <label>Location</label>
                        <input name="Location" type="text" />
                        <label>Description</label>
                        <input name="Description" type="text" />
                        <button name="Save" type="button">
                            Save
                        </button>
                    </form>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }

    saveItem() {
        const options = { encrypt: false }
        this.userSession.putFile(SUBJECTS_FILENAME, JSON.stringify(subjects), options)
        .finally(() => {
        if(window.location.search) {
            window.history.pushState(null, "", window.location.href.split("?")[0])
        }
        resolveSubjects(this, this.userSession, subjects)
        });
    }
}

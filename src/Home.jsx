import React, { Component } from 'react';
import { Person } from 'blockstack';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import { appConfig } from './utils/Blockstack';
import { UserSession } from 'blockstack';

const avatarFallbackImage =
    'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Home extends Component {
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
            selectedTab: 'Timer',
        };

        this.userSession = new UserSession({ appConfig });
    }

    render() {
        const { userSession } = this.props; //handleSignOut,
        // const { person } = this.state
        return !userSession.isSignInPending() ? (
            <ErrorBoundary>
                <div className="divFlex">
                    {/* <Sidebar
                        selectedTab={this.state.selectedTab}
                        selectTab={this.selectTab}
                    ></Sidebar> */}
                    <div className="main">
                        <Main
                            userSession={this.props.userSession}
                            selectedTab={this.state.selectedTab}
                        ></Main>
                    </div>
                </div>
            </ErrorBoundary>
        ) : null;
    }

    componentWillMount() {
        const { userSession } = this.props;
        this.setState({
            person: new Person(userSession.loadUserData().profile),
        });
        // }

        // // componentDidMount() {
        // BlockstackUtils.getCalendars()
        //     .then(calendars => {
        //         if (calendars.length === 0) calendars = defaultCalendars;

        //         this.setState({ calendars }, () => {
        //             console.log('calendars set');
        //             console.table(calendars);
        //         });
        //     })
        //     .catch(err => server_error(err));
    }

    selectTab = selectedTab => {
        this.setState({ selectedTab }, () =>
            console.log(`Tab selected:`, this.state.selectedTab)
        );
    };
}

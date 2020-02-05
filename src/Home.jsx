import React, { Component } from 'react';
import { Person } from 'blockstack';
import Main from './components/Main';
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
        };

        this.userSession = new UserSession({ appConfig });
    }

    render() {
        const { userSession } = this.props;
        return !userSession.isSignInPending() ? (
            <ErrorBoundary>
                <div className="divFlex">
                    <div className="main">
                        <h1 className="appTitle">AlphaTimer</h1>
                        <Main userSession={this.props.userSession}></Main>
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
    }

    selectTab = selectedTab => {
        this.setState({ selectedTab }, () =>
            console.log(`Tab selected:`, this.state.selectedTab)
        );
    };
}

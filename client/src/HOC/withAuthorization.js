import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';

const INITIAL_STATE = {
    authUser: null
};

const withAuthorization = authCondition => WrappedComponent => {
    class WithAuthorization extends Component {
        constructor(props) {
            super(props);

            this.state = { ...INITIAL_STATE };
        }

        componentDidMount = () => {
            firebase.auth.onAuthStateChanged(authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push('/signin');
                }
            });
        };

        render() {
            return this.state.authUser ? (
                <WrappedComponent {...this.props} />
            ) : null;
        }
    }

    return withRouter(WithAuthorization);
};

withAuthorization.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

const composedHOC = compose(
    connect(
        mapStateToProps,
        null
    )
);

// export default composedHOC;
// export default compose(
// 	connect(mapStateToProps),
// 	withAuthorization
// );
export default connect(mapStateToProps)(withAuthorization);

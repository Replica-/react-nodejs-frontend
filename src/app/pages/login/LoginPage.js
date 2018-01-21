import React, { Component} from 'react';
import { connect } from 'react-redux';
import { PageComponent }  from 'common/Page';
import LoginForm from './LoginForm'
import {Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './style.acss';

import { SubmissionError } from 'redux-form';

import { authenticate, fetchToken } from './LoginActions'
import { showLoading, hideLoading } from 'common/CommonActions'


class LoginPage extends Component {

    constructor (props) {
        super(props);
        this.handleValidate = this.handleValidate.bind(this);
    }

    /**
     * Handle validate from Login Form.
     * @param {form} Form to validate
     * @param {dispatch} Dispatch action for redux
     *
     * @emits {Error} If submission form promise fails at any point it will throw an error, if the api returns an error submission error is thrown.
     *
     * @return promise
     */
    handleValidate (form, dispatch) {
        dispatch(showLoading());

        // Attempt to authenticate
        return dispatch(authenticate(form.email, form.password)).then(result => {

            if (result.type == "AUTH_SUCCESS"){

                // Attempt to fetch the oauth2 token
                return this.props.fetchToken().then(result => {
                    if (result.type == "TOKEN_SUCCESS"){
                        // We should redirect now
                        this.props.history.push("/splash");
                    } else {
                        throw new SubmissionError({
                            email: 'User or password is incorrect',
                            _error: 'Login failed!',
                        });
                    }
                }).catch(error => { console.error(error); this.props.hideLoading(); throw error;});

            } else {
                throw new SubmissionError({
                    email: 'User or password is incorrect',
                    _error: 'Login failed!',
                });
            }
        }).catch(error => { console.error(error); this.props.hideLoading(); throw error;});

    }

    render() {
        return (
            <div className={styles.root} >
                <Col xs={12} sm={12} md={12}>
                    <LoginForm onSubmit={this.showResults} onValidate={this.handleValidate} />
                </Col>
            </div>
        );
    }
}

const mapStateToProps = () => {

    return {
        showLoading: PropTypes.func.isRequired,
        hideLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, authenticate, fetchToken }) (PageComponent(LoginPage))

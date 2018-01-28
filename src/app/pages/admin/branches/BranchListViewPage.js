import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'common/CommonActions'
import { safe } from 'common/Functions'
import { PageComponent }  from 'common/Page';
import { saveBranch } from './BranchListActions'
import BranchListViewForm from './BranchListViewForm'
import { Table } from 'common/Table';
import PropTypes from 'prop-types';

export class BranchListViewPage extends Component {

    constructor (props) {
        super(props);
    }

    componentDidMount() {

        //this.props.showLoading();

    }

    /**
     * Handle Click - Placeholder for header clicks
     */
    handleClick(context) {

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
        return dispatch(authenticate(form.email, form.password)).then((result,error) => {

                if (result.type == "AUTH_SUCCESS"){
            return this.props.fetchToken();
        } else {
            throw new SubmissionError({
                email: 'User or password is incorrect',
                _error: 'Login failed!',
            });

            return Promise.reject();
        }
    }).then((result,error) => {
            if (result.type == "TOKEN_SUCCESS"){
            // We should redirect now
            this.props.history.push("/splash");
            return Promise.resolve();
        } else {
            throw new SubmissionError({
                email: 'User or password is incorrect',
                _error: 'Login failed!',
            });
            return Promise.reject();
        }
    }).catch(error => { console.error(error); this.props.hideLoading(); throw error;});

    }

    render() {

        return (
            <div>
                <BranchListViewForm initial={this.props.branch} onValidate={this.handleValidate} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    const id = safe(ownProps.match , ["params", "id"], -1);
    const entity = safe(state.entities, ["branch", id], null);

    return {
        branch: entity,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading  }) (PageComponent(BranchListViewPage))

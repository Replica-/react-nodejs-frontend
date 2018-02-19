import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'common/CommonActions'
import { safe } from 'common/Functions'
import { PageComponent }  from 'common/Page';
import { saveBranch } from './actions'
import BranchListViewForm from './BranchListViewForm'
import { Table } from 'common/Table';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';

export class BranchListViewPage extends Component {

    constructor (props) {
        super(props);

        this.handleValidate = this.handleValidate.bind(this);
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
        return dispatch(saveBranch(form)).then((result,error) => {
                if (result.type == "BRANCH_SAVE_SUCCESS"){

                    this.props.hideLoading();

                    return Promise.resolve();

                } else {
                    throw new SubmissionError({
                        name: 'User or password is incorrect',
                        _error: 'Login failed!',
                    });

                    return Promise.reject();
                }

        }).catch(error => { console.error(error); this.props.hideLoading(); throw error;
        }).then((result, error) => {
            //this.props.showSuccess();
        });

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
        title: "Branch view",
        branch: entity,
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
}

export default connect(mapStateToProps, { showLoading, hideLoading, saveBranch  }) (PageComponent(BranchListViewPage))

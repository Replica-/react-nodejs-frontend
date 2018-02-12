import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { safe } from 'common/Functions'

let OrganisationListViewForm = props => {
    const { error, handleSubmit, submitSucceeded, pristine, submitting, onValidate, successMessage } = props;

        return (
        <div className="login-panel panel panel-default">


            <div className="panel-body">
                {!submitting && error && <div className="alert alert-danger">{error}</div>}
                {!submitting && submitSucceeded && !error && <div className="alert alert-success">{props.initial == null?"Organisation Added":"Organisation Updated"}</div>}
                <form onSubmit={handleSubmit(onValidate)}>
                    <fieldset>
                        <div className="form-group">
                        <label>Name of organisation</label>
                        <Field
                        name="name"
                        className="form-control"
                        component="input"
                        type="text"
                        placeholder="Name"
                            />
                        <p className="help-block">Example block-level help text here.</p>
                        </div>

                        <button type="submit" className="btn btn-default btn-success">{props.initial == null?"Add":"Update"}</button>
                        <button type="reset" className="btn btn-default">Reset Button</button>

                    </fieldset>
                </form>
            </div>
        </div>
    );
};

OrganisationListViewForm = reduxForm({
    form: 'organisationlistviewForm',
})(OrganisationListViewForm);

const mapStateToProps = (state, ownProps) => {

    return {
        //formSubmitted: safe(state.form, ['BranchListViewForm', 'submitSucceeded'], false),
        initialValues: ownProps.initial, // pull initial values from account reducer
        hideLoading: PropTypes.func.isRequired,
        showLoading: PropTypes.func.isRequired
    }
};

OrganisationListViewForm = connect(
        mapStateToProps,
{  } // bind account loading action creator
)(OrganisationListViewForm);

export default OrganisationListViewForm;

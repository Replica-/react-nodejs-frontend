import React, { Component, PropTypes } from 'react';
import { CSRInputCriteria } from './FormCriteria'
import { Field, reduxForm, reducer as formReducer, formValueSelector, change } from 'redux-form'
import { connect } from 'react-redux'
import PortholeComponent from '../common/PortholeComponent';
import { clearBreadcrumb, pushBreadcrumb } from 'amplifier/BreadCrumb/actions'
import { submitSearch } from '../actions'

const FRL_DESC = 'Fire Resistance Level'
const RW_DESC = 'Weighted Sound Reduction Index'
const RWCTR_DESC = 'Weighted Sound Reduction Index plus Low Frequency Spectrum Adaptor'

class SearchForm extends PortholeComponent {

    componentDidMount() {
        super.componentDidMount();
        this.props.clearBreadcrumb();
        this.props.pushBreadcrumb('search/', 'System Number Search')
    }

    handleSubmit = (e) => {
        e.stopPropagation()
        e.preventDefault()

        this.props.submitSearch(this.props.formValues.search.values)
        window.react.history.push("searchSystemResult/")
        $("#REACT-FOOTER-CSR").hide();
        return false
    }

    render() {

        const displayState = this.props.formDisplayState

        // To refresh page iscroll
        this.props.changeHandler()

        return (
            <form>
                <p>Search systems by number. Both current and previous system numbers may be used.</p>
                <div>
                    <CSRInputCriteria label="Search By Number" name="searchSystem" options={this.props.formOptions.searchSystem} value="" info="" />
                </div>
                <fieldset>
                    <button value="Search Systems" className="sa-input-btn" onClick={this.handleSubmit}>Search Systems</button>
                </fieldset>
            </form>
        )
    }
}

const mapStateToProps = (state) => {

    const selector = formValueSelector('search')

    return {
        formOptions: state.formOptions,
        formDisplayState: selector(
            state,
            'searchSystem'
        ),
        initialValues: state.formState.default,
        formValues: state.form
    }
}

// state mapping needs to come before redux form otherwise it stuffs up the form identifier
SearchForm = reduxForm({
    form: 'search',
    enableReinitialize: true,
    destroyOnUnmount: false
})(SearchForm)

SearchForm = connect(
    mapStateToProps,
    {
        pushBreadcrumb,
        clearBreadcrumb,
        submitSearch
    }
)(SearchForm)


export default SearchForm
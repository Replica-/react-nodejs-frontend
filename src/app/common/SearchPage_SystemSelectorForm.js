import React, { Component, PropTypes } from 'react';
import { CSRRadioCriteria, CSRCheckboxCriteria, CSRSelectCriteria, CSRRangeSliderCriteria } from './FormCriteria'
import { Field, reduxForm, reducer as formReducer, formValueSelector, change } from 'redux-form'
import { connect } from 'react-redux'
import PortholeComponent from '../common/PortholeComponent';
import { clearBreadcrumb, pushBreadcrumb } from 'amplifier/BreadCrumb/actions'
import { submitSearch } from '../actions'

const FRL_DESC = 'Fire Resistance Level'
const RW_DESC = 'Weighted Sound Reduction Index'
const RWCTR_DESC = 'Weighted Sound Reduction Index plus Low Frequency Spectrum Adaptor'

class SystemSelectorForm extends PortholeComponent {

    componentDidMount() {
        super.componentDidMount();
        this.props.clearBreadcrumb();
        this.props.pushBreadcrumb('search/', 'System Selector');


        $(".react-search-system").removeClass('ui-btn-active');
        $(".react-system-selector").addClass('ui-btn-active');


    }

    handleSubmit = (e) => {
        e.stopPropagation()
        e.preventDefault()

        this.props.submitSearch(this.props.formValues.search.values);
        this.props.formValues.search.values.searchSystem = "";
        console.error(this.props.formValues.search);
        window.react.history.push("searchResult/")
        $("#REACT-FOOTER-CSR").hide();
        return false
    }

    render() {

        const displayState = this.props.formDisplayState

        // To refresh page iscroll
        this.props.changeHandler()





        return (
            <form>
                <p>Find the right system by choosing fire, acoustic and other specifications to fit your project.</p>
                <CSRRadioCriteria label="Application" name="application" options={this.props.formOptions.application} col="4" />
                <CSRSelectCriteria label="Structure" name="structure" options={this.props.formOptions.structure} />

                {displayState.application === 'wall' &&
                    <div>
                        {displayState.structure !== 'masonry frl upgrade' &&
                            <div>
                                <CSRRadioCriteria label="Wall Type" name="wallType" value="internal" options={this.props.formOptions.wallType} col="2" onChange={(event, value) => {
                                    
                                        this.props.dispatch(change('search', 'wallLinings', value === 'internal' ? 'wet wet' : 'ext dry'))
                                }} />
                                {displayState.wallType === 'internal' &&
                                    <fieldset>
                                        <div className="sa-row">
                                            <div className="sa-col-sm-2">
                                            </div>
                                            <div className="sa-col-sm-2">
                                                <div className="sa-checkbox">
                                                    <Field component="input" type="checkbox" value="0" id="discontinuous" name="discontinuous" normalize={ value => {
                                                        return value ? 1 : 0
                                                    }} />
                                                    <label htmlFor="discontinuous">Discontinuous Construction</label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                }
                                <CSRSelectCriteria label="Wall Linings" name="wallLinings" value="" options={this.props.formOptions.wallLinings} info="The combination of lining material performance for each side of the wall. ‘Dry’ indicates that one side is in an interior wall with no wet area functionality, ‘Wet’ indicates that one side of the wall in an interior with wet area functionality, and ‘External’ indicates a cladding material on the exterior of the building. Select a pre-set combination which matches the use of each side of your wall system." />
                                <CSRCheckboxCriteria label="Additional Lining Performance" name="additionalLinings" value="" options={this.props.formOptions.additionalLinings} col="2" />
                                <CSRSelectCriteria label="FRL" name="frl" value="" options={this.props.formOptions.frl} desc={FRL_DESC} info="Each FRL field represents a different criteria for substance resistance (without failure) to heat and flame. All fields are expressed in minutes, with the first field covering structural adequacy, the second representing structural integrity, and the third, insulation. A value in the first field indicates that the system is load bearing. Selecting -/-/- indicates that no fire rating is required." />

                                {displayState.frl !== '0,0,0' &&
                                    <CSRRadioCriteria label="FRL Direction" name="frlDirection" value="" options={this.props.formOptions.frlDirection} col="2" />
                                }

                                <CSRRangeSliderCriteria label="Rw" name="rw" min={25} max={80} step={1} desc={RW_DESC} info="Rw is the Weighted Sound Reduction Index in dB (decibels) and which describes the airborne sound insulation of a building material or element. Search an Rw range by entering the lowest and highest acceptable performance value." />
                                <CSRRangeSliderCriteria label="Rw + Ctr" name="rwCtr" min={20} max={75} step={1} desc={RWCTR_DESC} info="Rw is the Weighted Sound Reduction Index in dB (decibels) and which describes the airborne sound insulation of a building material or element. Ctr is the Low Frequency Spectrum Adaptor, an adjustment factor used to account for low frequency noise. Ctr is always a negative number, so the Rw+Ctr will always be less than the Rw value. Search an Rw+Ctr range by entering the lowest and highest acceptable performance value." />
                            </div>
                        }

                        {displayState.structure === 'masonry frl upgrade' &&
                            <CSRRadioCriteria label="Additional FRL" name="additionalFrl" value="" options={this.props.formOptions.additionalFrl} col="3" />
                        }

                    </div>
                }

                {displayState.application === 'ceiling' &&
                    <div>
                        <CSRSelectCriteria label="Ceiling Type" name="ceilingType" options={this.props.formOptions.ceilingType} />

                        {displayState.ceilingType !== 'suspended (perforated plasterboard)' && displayState.ceilingType !== 'suspended (ceiling tile)' &&
                            <div>
                                <CSRSelectCriteria label="FRL" name="frl" value="" options={this.props.formOptions.frl} desc={FRL_DESC} info="Each FRL field represents a different criteria for substance resistance (without failure) to heat and flame. All fields are expressed in minutes, with the first field covering structural adequacy, the second representing structural integrity, and the third, insulation. A value in the first field indicates that the system is load bearing. Selecting -/-/- indicates that no fire rating is required." />

                                {displayState.frl !== '0,0,0' &&
                                    <CSRRadioCriteria label="FRL Direction" name="frlDirection" value="" options={this.props.formOptions.frlDirection} col="3" />
                                }
                            </div>
                        }

                        {displayState.frl !== '0,0,0' && displayState.ceilingType !== 'suspended (perforated plasterboard)' && displayState.ceilingType !== 'suspended (ceiling tile)' &&
                            <CSRRadioCriteria label="RISF" name="risf" value="" options={this.props.formOptions.risf} col="3" desc="Resistance to Incipient Spread of Fire" />
                        }

                        {displayState.ceilingType !== 'suspended (perforated plasterboard)' && displayState.ceilingType !== 'suspended (ceiling tile)' &&
                            <div>
                                <CSRRangeSliderCriteria label="Rw" name="rw" min={25} max={80} step={1} desc={RW_DESC} info="Rw is the Weighted Sound Reduction Index in dB (decibels) and which describes the airborne sound insulation of a building material or element. Search an Rw range by entering the lowest and highest acceptable performance value." />
                                <CSRRangeSliderCriteria label="Rw + Ctr" name="rwCtr" min={20} max={75} step={1} desc={RWCTR_DESC} info="Rw is the Weighted Sound Reduction Index in dB (decibels) and which describes the airborne sound insulation of a building material or element. Ctr is the Low Frequency Spectrum Adaptor, an adjustment factor used to account for low frequency noise. Ctr is always a negative number, so the Rw+Ctr will always be less than the Rw value. Search an Rw+Ctr range by entering the lowest and highest acceptable performance value." />
                            </div>
                        }

                        {(displayState.structure === 'floor/ceiling' && (displayState.ceilingType === 'direct fix' || displayState.ceilingType === 'suspended (flush set)')) &&
                            <div>
                                <CSRRadioCriteria label="Floor Type" name="lnwFloorType" value="" options={this.props.formOptions.lnwFloorType} col="2" />
                                <CSRSelectCriteria label="Ln,w" name="lnwPerformance" value="" options={this.props.formOptions.lnwPerformance} desc="Weighted Normalised Impact Sound Pressure Level" info="Ln,w is the Weighted Normalized Impact Sound Pressure Level measuring the noise impact performance of a floor, dependent on the amount of noise entering through the floor and the amount of absorptive material in the receiving room. In this field, indicate if your performance range is dependent on a bare or lined floor, and in the second field, narrow your search results by a performance range." />
                            </div>
                        }

                        {(displayState.ceilingType === 'suspended (perforated plasterboard)' || displayState.ceilingType === 'suspended (ceiling tile)') &&
                            <div>
                                <CSRRangeSliderCriteria label="NRC" name="nrc" min={0.1} max={0.9} desc="Noise Reduction Coefficient" step={0.1} />
                            </div>
                        }
                    </div>
                }

                {(displayState.application === 'column' || displayState.application === 'beam') &&
                    <CSRSelectCriteria label="FRL" name="frl" value="" options={this.props.formOptions.frl} desc={FRL_DESC} info="Each FRL field represents different criteria for substance resistance (without failure) to heat and flame. Only the first field, structural adequacy, is required for this Application." />
                }

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
            'application',
            'wallType',
            'structure',
            'frlDirection',
            'ceilingType',
            'frl'
        ),
        initialValues: state.formState.default,
        formValues: state.form
    }
}

// state mapping needs to come before redux form otherwise it stuffs up the form identifier
SystemSelectorForm = reduxForm({
    form: 'search',
    enableReinitialize: true,
    destroyOnUnmount: false
})(SystemSelectorForm)

SystemSelectorForm = connect(
    mapStateToProps,
    {
        pushBreadcrumb,
        clearBreadcrumb,
        submitSearch
    }
)(SystemSelectorForm)


export default SystemSelectorForm
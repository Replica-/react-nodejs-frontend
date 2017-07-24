import React from 'react'
import { FormTextInput, FormRadioInput, FormSelectInput, FormCheckboxInput, FormRangeSliderInput } from './Form'
import { Field, reduxForm, reducer as formReducer } from 'redux-form'
import { sendPopup } from '../common/PortholeActions'

const CSRCriteria = (props) => {

    return (
        <fieldset className="sa-fieldset">
            <div className="sa-row">
                <div className={'sa-col-sm-2'}>
                    <label className="sa-label">
                        {props.label}
                        {props.info &&
                            <i className="sa-tooltip ui-icon ui-icon-info-sign" onClick={() => {
                                sendPopup(window.windowProxy, props.info, props.label)
                            }}></i>
                        }
                    </label>
                    <p className="sa-label-desc">{props.desc}</p>
                </div>
                <div className={'sa-col-sm-2'}>
                    {props.children}
                </div>
            </div>
        </fieldset>
    )
}

const CSRInputCriteria = (props) => {

    const styleClass = {
        outerDiv: 'sa-input-segment-group',
        innerDiv: 'sa-col-xs-' + props.col,
        label: 'sa-input-segment'
    }

    return (
        <CSRCriteria {...props}>
            <Field {...props} defaultValue="wall" styleClass={styleClass} component={FormTextInput} />
        </CSRCriteria>
)
}

const CSRRadioCriteria = (props) => {

    const styleClass = {
        outerDiv: 'sa-radio-segment-group',
        innerDiv: 'sa-col-xs-' + props.col,
        label: 'sa-radio-segment'
    }

    return (
        <CSRCriteria {...props}>
             <Field {...props} defaultValue="wall" styleClass={styleClass} component={FormRadioInput} />
        </CSRCriteria>
    )
}

const CSRCheckboxCriteria = (props) => {

    const styleClass = {
        outerDiv: 'sa-checkbox-segment-group',
        innerDiv: 'sa-col-xs-' + props.col,
        label: 'sa-checkbox-segment'
    }

    return (
        <CSRCriteria {...props}>
             <Field {...props} defaultValue="wall" styleClass={styleClass} component={FormCheckboxInput} />
        </CSRCriteria>
    )
}

const CSRSelectCriteria = (props) => {

    const styleClass = {
        div: 'sa-col-sm-' + props.col,
        label: 'sa-select-wrap',
        select: 'sa-select'
    }

    return (
        <CSRCriteria {...props}>
            <div className="sa-select-wrap">
                <Field {...props} defaultValue="wall" styleClass={styleClass} component={FormSelectInput} />
            </div>
        </CSRCriteria>
    )
}

const CSRRangeSliderCriteria = (props) => {

    const styleClass = {
        sliderDiv: 'sa-slider-wrap'
    }

    return (
        <CSRCriteria {...props}>
             <Field {...props} defaultValue="wall" styleClass={styleClass} component={FormRangeSliderInput} />
        </CSRCriteria>
    )
}

export { CSRInputCriteria, CSRRadioCriteria, CSRCheckboxCriteria, CSRSelectCriteria, CSRRangeSliderCriteria }
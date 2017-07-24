import React from 'react';
import { Field } from 'redux-form'
//import InputRange from 'react-input-range'
import { Range } from 'rc-slider'

const RadioInput = (props) => {

    const options = props.options

    let radioItems = options.map((option, index) =>
        <div className={props.styleClass.innerDiv} key={index}>
            <input type="radio"
                id={`${props.input.name}${index}`}
                name={props.name}
                value={option.value}
                checked={option.value === props.value}
                onChange={() => props.onChange(option.value)}
                />
            <label htmlFor={`${props.input.name}${index}`} className={props.styleClass.label}>{option.label}</label>
        </div>
    )

    return (
        <div className={props.styleClass.outerDiv}>
            {radioItems}
        </div>
    )
}

const FormRadioInput = (props) => {

    const { input: { value, onChange }} = props

    return (
        <RadioInput {...props} onChange={onChange} value={value} />
    )
}

const FormTextInput = (props) => {

    const { input: { value, onChange }} = props

    return (
        <TextInput {...props} onChange={onChange} value={value} />
)
}

const TextInput = (props) => {

    return (
        <label>
            <input onChange={(event) => props.onChange(event.target.value)} className={props.styleClass.label} type="text" defaultValue={props.value} />
        </label>
    )
}

const SelectInput = (props) => {

    const options = props.options
    let optionItems = options.map((option, index) =>
        <option key={index} value={option.value}>{option.label}</option>
    )

    return (
        <select className={props.styleClass.select} value={props.value} onChange={(event) => props.onChange(event.target.value)}>
            {optionItems}
        </select>
    )
}

const FormSelectInput = (props) => {

    const { input: { value, onChange }} = props

    return (
        <SelectInput {...props} value={value} onChange={onChange} />
    )
}

const CheckboxInput = (props) => {

    const options = props.options
    let checkboxItems = options.map((option, index) =>
        <div className={props.styleClass.innerDiv} key={index}>
            <input type="checkbox"
                id={`${props.input.name}${index}`}
                value={option.value}
                checked={props.value.indexOf(option.value) !== -1}
                onClick={() => props.onChange(option.value)}
                />
            <label htmlFor={`${props.input.name}${index}`} className={props.styleClass.label}>{option.label}</label>
        </div>
    )

    return (
        <div className={props.styleClass.outerDiv}>
            {checkboxItems}
        </div>
    )
}

class FormCheckboxInput extends React.Component {


    onChange = (value) => {
        const newValue = [...this.props.input.value]
        let index = newValue.indexOf(value)

        if (index === -1) {
            newValue.push(value)
        } else {
            newValue.splice(index, 1)
        }

        this.props.input.onChange(newValue)
    }

    render() {

        return (
            <CheckboxInput {...this.props} value={this.props.input.value} onChange={this.onChange} />
        )
    }
}

class FormRangeSliderInput extends React.Component {

    onChange = (values) => {
    

        this.props.input.onChange([values[0], values[1]])
    }

    onMinChange = (e) => {
        //this.props.input.onChange([, this.props.max])
        this.props.input.onChange([Number(e.target.value), this.props.input.value[1]])
    }

    onMaxChange = (e) => {
        //this.props.input.onChange([this.props.min, e.target.value])

        this.props.input.onChange([this.props.input.value[0], Number(e.target.value)])
    }

    onBlurMinChange = (e) => {
        if (e.target.value < this.props.min) {
            this.props.input.onChange([this.props.min, this.props.input.value[1]])
        } else if (e.target.value > this.props.input.value[1]) {
            this.props.input.onChange([this.props.input.value[1], this.props.input.value[1]])
        }
    }

    onBlurMaxChange = (e) => {
        if (e.target.value > this.props.max) {
            this.props.input.onChange([this.props.input.value[0], this.props.max])
        } else if (e.target.value < this.props.input.value[0]) {
            this.props.input.onChange([this.props.input.value[0], this.props.input.value[0]])
        }
    }

    render() {

        return(
            <div>
                <div className={this.props.styleClass.sliderDiv}>
                    <Range
                        min={this.props.min}
                        max={this.props.max}
                        value={[this.props.input.value[0], this.props.input.value[1]]}
                        onChange={this.onChange}
                        allowCross={false}
                        step={this.props.step}
                    />
                </div>
                <input type="number" onChange={this.onMinChange} value={this.props.input.value[0]} onBlur={this.onBlurMinChange} min={this.props.min} max={this.props.max} step={this.props.step} id="input-number-min " className="slider-input-number-min" />
                <input type="number" onChange={this.onMaxChange} value={this.props.input.value[1]} onBlur={this.onBlurMaxChange} min={this.props.min} max={this.props.max} step={this.props.step} id="input-number-max" className="slider-input-number-max" />
            </div>
        )
    }
}

export { FormTextInput, FormRadioInput, FormSelectInput, FormCheckboxInput, FormRangeSliderInput }
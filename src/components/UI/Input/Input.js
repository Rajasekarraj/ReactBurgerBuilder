import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let deliveryDropdown = null;
    let inputClasses = [classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.InvalidInputElement);
    }
    switch(props.elementType) {
        case 'input':
            inputElement = <input
              className = {inputClasses.join(' ')}
              {...props.elementConfig}
              value={props.value}
              onChange = {props.changed}/>;
            break;
        case 'textarea':
            inputElement = <textarea 
              className = {inputClasses.join(' ')}
              {...props.elementConfig}
              value={props.value}
              onChange = {props.changed}/>;
            break;
        case 'select':
            deliveryDropdown = props.elementConfig.options.map(dropdownValues =>{
                return <option
                 key={dropdownValues.value}
                 value = {dropdownValues.value}>{dropdownValues.displayValue}</option>
            })
            inputElement = <select
              className = {inputClasses.join(' ')}
              onChange = {props.changed}>{deliveryDropdown}</select>
            break;    
        default:
            inputElement = <input
              className = {inputClasses.join(' ')}
              {...props.elementConfig}
              value={props.value}
              onChange = {props.changed}/>;
            break;
    }

    return(
        <div className = {classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
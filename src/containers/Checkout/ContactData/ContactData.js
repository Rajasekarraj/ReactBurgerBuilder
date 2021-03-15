import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';
class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 8
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            streetName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        isFormValid: false,
        spinner: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    orderPlaced = (event) => {
        event.preventDefault(); // To Prevent Page reloading
        console.log(this.props.ingrs);
        this.setState({spinner: true});
        let orders = {};
        for(let formElementIdentifier in this.state.orderForm) {
            orders[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingrs,
            price: this.props.fp,
            customer: orders
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({spinner: false});
            })
            .catch(error => {
                console.log(error)
                this.setState({spinner: false});
            })  
        this.props.history.push('/') 
    }

    checkInputValidity(rules, value) {
        let isValid = true;
        if(rules.required) {
            isValid = value !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = isValid && value.length >=rules.minLength;
        }
        if(rules.maxLength) {
            isValid = isValid && value.length <=rules.maxLength;
        }
        return isValid;
    }

    inputChangeHandler = (event, inputElementIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedInputValue = {
            ...updatedOrderForm[inputElementIdentifier]
        }
        updatedInputValue.value = event.target.value;
        updatedInputValue.valid = this.checkInputValidity(updatedInputValue.validation, updatedInputValue.value)
        updatedInputValue.touched = true;
        updatedOrderForm[inputElementIdentifier] = updatedInputValue;
        let isFormValid = true;
        for(let formElement in updatedOrderForm) {
            isFormValid = updatedOrderForm[formElement].valid && isFormValid
        }
        this.setState({orderForm: updatedOrderForm, isFormValid: isFormValid})
    }

    render() {
        let inputElements = [];
        for(let key in this.state.orderForm) {
            inputElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit = {this.orderPlaced}>
            {inputElements.map(inputElement => {
            return <Input
                 key = {inputElement.id}
                 elementType = {inputElement.config.elementType}
                 elementConfig = {inputElement.config.elementConfig}
                 value = {inputElement.value}
                 changed = {(event) => this.inputChangeHandler(event, inputElement.id)}
                 invalid = {!inputElement.config.valid}
                 shouldValidate = {inputElement.config.validation}
                 touched = {inputElement.config.touched}/>
            })}
            <Button disabled = {!this.state.isFormValid} btnType='Success'>ORDER</Button>
        </form>);

        if(this.state.spinner) {
            form = <Spinner />
        }
        
        return(
            <div className={classes.ContactData}>
                <h4>Enter your delivery address</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrs: state.ingredients,
        fp: state.finalPrice
    }
}

export default connect(mapStateToProps)(ContactData);
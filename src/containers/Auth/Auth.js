import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Auth extends Component {

    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isFormValid: false,
        isSignup: true
    }

    componentDidMount() {
        console.log('building props', this.props.building);
        if(!this.props.building && this.props.redirectPath !== '/') {
            console.log('dispatching the redirect path to /')
            this.props.setAuthRedirectPath();
        }
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
        const updatedAuthForm = {
            ...this.state.authForm
        }
        const updatedInputValue = {
            ...updatedAuthForm[inputElementIdentifier]
        }
        updatedInputValue.value = event.target.value;
        updatedInputValue.valid = this.checkInputValidity(updatedInputValue.validation, updatedInputValue.value)
        updatedInputValue.touched = true;
        updatedAuthForm[inputElementIdentifier] = updatedInputValue;
        let isFormValid = true;
        for(let formElement in updatedAuthForm) {
            isFormValid = updatedAuthForm[formElement].valid && isFormValid
        }
        this.setState({authForm: updatedAuthForm, isFormValid: isFormValid})
    }

    performAuthentication = (event) => {
        event.preventDefault();
        this.props.auth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }

    render() {
        let formElements = [];
        for(let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        let form = (<form onSubmit = {this.performAuthentication}>
            {formElements.map(formElement => {
            return <Input
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value}
                changed = {(event) => this.inputChangeHandler(event, formElement.id)}
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}/>
            })}
            <Button btnType='Success'>SUBMIT</Button>
        </form>)
        if(this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }
        let redirection = null;
        if (this.props.token) {
            redirection = <Redirect to={this.props.redirectPath} />
        }
        return(
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                {redirection}
                <Button
                 clicked={this.switchAuthModeHandler}
                 btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        building: state.bgrBuilder.building,
        redirectPath: state.auth.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
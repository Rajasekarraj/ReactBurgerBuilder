export const checkInputValidity = (rules, value) => {
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
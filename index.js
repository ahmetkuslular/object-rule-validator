"use strict";

const condition = {
    GREATER_THAN: '>',
    LESS_THAN: '<',
    GREATER_THAN_EQUAL: '>=',
    LESS_THAN_EQUAL: '<=',
    EQUAL: '===',
    NOT_EQUAL: '!==',
    MAX: 'max',
    MIN: 'min'
}

function compare(post, operator, value) {
    switch (operator) {
        case condition.GREATER_THAN:
            return post > value
        case condition.LESS_THAN:
            return post < value
        case condition.GREATER_THAN_EQUAL:
            return post >= value
        case condition.LESS_THAN_EQUAL:
            return post <= value
        case condition.EQUAL:
            return post === value
        case condition.NOT_EQUAL:
            return post !== value
        case condition.MAX:
            return post <= value
        case condition.MIN:
            return post >= value
    }
}

function typeControlSwitch(value, rule) {
    if (Array.isArray(rule)) {
        return ruleIsArray(value, rule);
    }else if (typeof rule === "object") {
        return ruleIsObject(value, rule);
    }else {
        return false;
    }
}

function ruleIsObject (value, rule) {
    if(rule.value){
        if(rule.condition){
            if (compare(value, rule.condition, rule.value)) {
                return returnResult(rule['trueResult'], true)
            }
        }else if(rule.regex){
            if(rule.regex.test(value)){
                return returnResult(rule['trueResult'], true)
            }
        }
    }
    return returnResult(rule['falseResult'], false)
}

function ruleIsArray(value, rule) {
    for (let i = 0; i < rule.length; i++) {
        const innerRule = rule[i];
        if(innerRule.value === undefined) continue;

        const result = typeControlSwitch(value, innerRule);
        if(!result){
            continue;
        }

        if(result === innerRule['falseResult']){
            continue;
        }
        return returnResult(innerRule.trueResult, true);
    }


    return false;
}

function returnResult(result, defualtResult) {
    return result ? result : defualtResult;
}


function objectValidator(values, rules) {
    const results =  Object.keys(values).map(valueKey => {
        const rule = rules[valueKey];
        if(rule) {
            return {key: valueKey, value:typeControlSwitch(values[valueKey], rule)}
        }else {
            return {key: valueKey, value: false};
        }
    })


    for (let i = 0; i < results.length; i++) {
        values[results[i].key] = results[i].value;
    }

    return values;
};


export default objectValidator;
export {condition};

"use strict";

function compare(post, operator, value) {
    switch (operator) {
        case ">":
            return post > value
        case "<":
            return post < value
        case ">=":
            return post >= value
        case "<=":
            return post <= value
        case "===":
            return post === value
        case "!==":
            return post !== value
    }
}

function typeControlSwitch(value, rule) {
    if (Array.isArray(rule)) {
        return ruleIsArray(value, rule);
    }else if (typeof rule === "object") {
        return ruleIsObject(value, rule);
    }else {
        return 'anything'
    }
}

function ruleIsObject (value, rule) {
    if (compare(value, rule.condition, rule.value)) {
        return returnResult(rule['trueResult'], true)
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


module.exports = function (values, rules) {
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





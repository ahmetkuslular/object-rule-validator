# object-rule-validator [![npm](https://img.shields.io/npm/v/object-rule-validator)](https://www.npmjs.com/package/variant-select)

object rule validation

## Installation

### NPM

```sh
npm install --save object-rule-validator
```

### yarn

```sh
yarn add object-rule-validator
```

## Usage

Create variants. You can give variants objects or strings.

```js
import objectValidator from 'object-rule-validator';

//dynamic values
const values = {
    name: 'ahmet',
    age : 18,
    isStudent: false
}

const rules = {
    name: {
        value: '',
        condition: '!=='
    },
    age: {
        value: 18,
        condition: '>=' 
    },
    isStudent: {
        value: true,
        condition: '==='
    }
}
 
```


```js
objectValidator(values, rules)

//output
{
    name: true,
    age: true,
    isStudent: false
}
```

## custom result

```
const data = {
    age: 10
}

const rules = {
    age: {
        value: 18,
        condition: '>='
        trueResult: 'Age is valid'
        falseResult: 'age must be 18 or older'  
    }
} 

//output (false)
{
    age: 'age must be 18 or older'  
}
```


## Multi Condition
If you want to make multi condition, you have to pass the rule as an array. What you need to pay attention to here is that the rules are read from the top and work in the if - else logic.
Also remember to pass trueResult or falseResult. otherwise you will get true or false for all values.
```

const rules = {
    number: [
        { value: 100, condition: '>=', trueResult: 'Greater than 100' } // 100 or greater than 100
        { value: 50, condition: '>=', trueResult: 'Greater than 50' } // 50 or greater than 50
        { value: 10, condition: '<', trueResult: 'Less than 10' } // Less than 10
    ]
} 

const data = { number: 120 }
//output
{ number: 'Greater than 100' }

const data = { number: 75 }
//output
{ number: 'Greater than 50' }

const data = { number: 5 }
//output
{ number: 'Less than 10' }

const data = { number: 5 }
//output (did not meet any condition)
{ number: false }
```

## TODO
* More Test
* Regex validation

## License

MIT

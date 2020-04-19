var ruleSetter = require('./');

var data = {
    value1: 50,
}

var rules = {
    value1: {
        value: 20,
        condition: '>=',
    }
}


describe('RuleSetter Tests', () => {

    it('one item validation', () => {
        const rules = { value1: { value: 20, condition: '>='}};

        expect(ruleSetter({value1: 50}, rules)).toEqual({value1: true});
        expect(ruleSetter({value1: 10}, rules)).toEqual({value1: false});
    });

    it('all equal control', () => {
        const conditions = [
            {condition: '>', result:false},
            {condition: '<', result:false},
            {condition: '>=', result:true},
            {condition: '<=', result:true},
            {condition: '===', result:true},
            {condition: '!==', result:false},
        ]
        conditions.map(item => {
            let rules = { value1: { value: 10, condition: item.condition}};
            return expect(ruleSetter({value1: 10}, rules)).toEqual({value1: item.result});

        })
    });
    it('regex control', () => {
        const data = {value1: "hello World"}
        const rules = { value1: { value: true, regex: /hello/}};

        expect(ruleSetter(data, rules)).toEqual({value1: true});
    });
});

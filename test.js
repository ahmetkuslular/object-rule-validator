import objectValidator, {condition} from "./index";


describe('RuleSetter Tests', () => {
    it('one item validation', () => {
        const rules = { value1: { value: 20, condition: '>='}};

        expect(objectValidator({value1: 50}, rules)).toEqual({value1: true});
        expect(objectValidator({value1: 10}, rules)).toEqual({value1: false});
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
            return expect(objectValidator({value1: 10}, rules)).toEqual({value1: item.result});

        })
    });

    it('regex control', () => {
        const data = {value1: "hello World"}
        const rules = { value1: { value: true, regex: /hello/}};

        expect(objectValidator(data, rules)).toEqual({value1: true});
    });

    it('min control', () => {
        const rules = { value1: { value: 20, condition: 'min'}};

        expect(objectValidator({value1: 50}, rules)).toEqual({value1: true});
        expect(objectValidator({value1: 10}, rules)).toEqual({value1: false});
    });

    it('max control', () => {
        const rules = { value1: { value: 20, condition: 'max'}};

        expect(objectValidator({value1: 50}, rules)).toEqual({value1: false});
        expect(objectValidator({value1: 10}, rules)).toEqual({value1: true});
    });
});

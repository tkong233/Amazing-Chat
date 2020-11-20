import React from 'react';
import Join from './Join';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 
import checkPropTypes from 'check-prop-types';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('Message Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                onSubmit: ()=>{},
                onChange: ()=>{},
                username: '',
                room: ''
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Join.propTypes, expectedProps, 'props', Join.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const props = {
                onSubmit: ()=>{},
                onChange: ()=>{},
                username: '',
                room: ''
            };
            wrapper = shallow(<Join {...props} />);
        });
        
        it('Should render join', ()=>{
            const join = wrapper.find(`[data-test='JoinComponent']`);
            expect(join.length).toBe(1);
        })
        

    });
});

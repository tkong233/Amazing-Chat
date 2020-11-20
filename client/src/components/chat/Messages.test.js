import React from 'react';
import Messages from './Messages';
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
                messages: [],
                user: ''
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Messages.propTypes, expectedProps, 'props', Messages.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const props = {
                messages: [
                    {text:'hey hey', user: 'userB'}, 
                    {text:'hello', user: 'userB'}, 
                ],
                user: 'userB'
            };
            wrapper = shallow(<Messages {...props} />);
        });
        
        it('Should render messages', ()=>{
            const msg = wrapper.find(`[data-test='MessagesComponent']`);
            expect(msg.length).toBe(1);
        })
        

    });
});

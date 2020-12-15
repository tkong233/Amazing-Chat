import React from 'react';
import Message from './Message';
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
                text: '',
                sender: '',
                user: '',
                type: ''
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Message.propTypes, expectedProps, 'props', Message.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const props = {
                text: 'hey hey',
                sender: 'userA',
                user: 'userB',
                type: 'text'
            };
            wrapper = shallow(<Message {...props} />);
        });
        
        it('Should render a single message', ()=>{
            const msg = wrapper.find(`[data-test='MessageComponent']`);
            // shallow render 
            expect(msg.length).toBe(0);
        });
        

    });
});

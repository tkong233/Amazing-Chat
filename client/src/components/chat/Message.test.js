import React from 'react';
import Message from './Message';
import {shallow} from 'enzyme';
import checkPropTypes from 'check-prop-types';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 
import { applyMiddleware, createStore } from 'redux';
import {middleware} from '../../store';
import rootReducer from '../../reducers/index'

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});

const setUp = (initialState={}) =>{
    const props = {
        text: 'hello hello'
    }
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    const wrapper = shallow(<Message store={store} {...props}/>).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('Message Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                text: '',
                sender: '',
                user: '',
                type: '',
                from: '',
                to: '',
                pairId: '',
                datetime: '',
                message: []
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Message.propTypes, expectedProps, 'props', Message.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const initialState = {
                chat:{
                    socket: 'testsocket'
                }
            };
            wrapper = setUp(initialState);
            wrapper.setProps({text: 'hello hello'})
        });
        
        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='MessageComponent']`);
            expect(container.length).toBe(0);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });
        

    });
});

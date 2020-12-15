import React from 'react';
import Chat from './Chat';
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

    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    const wrapper = shallow(<Chat store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('Chat Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                chat: {},
                user: {},
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Chat.propTypes, expectedProps, 'props', Chat.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const initialState = {
                auth:{user: {
                    name: 'testuser',
                    email: 'testuser@test.com',
                    profile_picture: 'testpicture'
                }},
                chat:{
                    messages:[],
                    socket: ''
                }
            };
            wrapper = setUp(initialState);
        });

        // it('Should render without errors', ()=>{
        //     const container = wrapper.find(`[data-test='ChatComponent']`);
        //     expect(container.length).toBe(1);
        // });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });


    });
});
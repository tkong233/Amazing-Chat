import React from 'react';
import ViewStatus from './ViewStatus';
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
    const wrapper = shallow(<ViewStatus store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('ViewStatus Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                user: {},
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(ViewStatus.propTypes, expectedProps, 'props', ViewStatus.name);
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
                }}
            };
            wrapper = setUp(initialState);
        });

        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='ViewStatusComponent']`);
            expect(container.length).toBe(1);
        });

        // it('Should status', ()=>{
        //     const container2 = wrapper.find(`[data-test='ViewStatusComponent2']`);
        //     expect(container2.length).toBe(1);
        // });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });

    });
});
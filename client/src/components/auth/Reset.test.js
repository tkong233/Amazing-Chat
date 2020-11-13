import React from 'react';
import Reset from './Reset';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 
import { applyMiddleware, createStore } from 'redux';
import {middleware} from '../../store';
import rootReducer from '../../reducers/index'

Enzyme.configure({
    adapter: new EnzymeAdapter(),
    // disableLifecycleMethods: true
});

const setUp = (initialState={}) =>{
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    const wrapper = shallow(<Reset store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('Reset Component', ()=>{
    // describe('Checking PropTypes', ()=>{
    //     it('Should not throw a warning', ()=>{
    //         const expectedProps = {
    //             loginUser: ()=>{},
    //             auth: {},
    //             errors: {}
    //         }
    //         const propsErr = checkPropTypes(Login.propTypes, expectedProps, 'props', Login.name);
    //         expect(propsErr).toBeUndefined();
    //     })
    // });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const initialState = {
                auth: {
                    isAuthenticated: false,
                    user: {},
                    loading: false
                },
                errors: {},
            };
            wrapper = setUp(initialState);
        });

        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='resetComponent']`);
            expect(container.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        })
    });
});

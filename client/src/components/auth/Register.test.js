import React from 'react';
import Register from './Register';
import {shallow} from 'enzyme';
import checkPropTypes from 'check-prop-types';
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
    const wrapper = shallow(<Register store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('Register Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                registerUser: ()=>{},
                auth: {},
                errors: {}
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Register.propTypes, expectedProps, 'props', Register.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const initialState = {
                auth: {
                    isAuthenticated: false,
                    user: {},
                    loading: false
                },
                errors: {}
            };
            wrapper = setUp(initialState);
        });

        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='registerComponent']`);
            expect(container.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });

        it('Redirect to dashboard if already authenticated', ()=>{
            const classInstance = wrapper.instance();
            classInstance.setState({auth: {
                isAuthenticated: true,
                user: {name: 'abc'},
                loading: false
              }})
            classInstance.componentDidMount();
            expect(classInstance.state.auth.isAuthenticated).toBe(true);

        });

        it ('Update error props', ()=>{
            const classInstance = wrapper.instance();
            const nextProps = {
                auth: {},
                errors: {password: "password not match"}
            }
            classInstance.componentWillReceiveProps(nextProps);
            expect(classInstance.state.errors).toStrictEqual({password: "password not match"});
        });

        it('OnChange and Submit event', ()=>{
            const value = 'abcde';
            wrapper.find('input').at(0).simulate('change', {
                target: {value}
            });
            wrapper.find('button').simulate('submit',{
                preventDefault: () => {}
            });
            expect(wrapper.state('email')).toStrictEqual('');
        });
    });
});

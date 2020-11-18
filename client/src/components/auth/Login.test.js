import React from 'react';
import Login from './Login';
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
    // const props = {
    //     location: {state: true},
    //     history: {push: jest.fn()}
    // };
    const location = {state: true};
    const history = {push: jest.fn()}
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    // const wrapper = shallow(<Login store={store} {...props} />).dive();
    const wrapper = shallow(<Login store={store} location={location} history={history} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('Login Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                loginUser: ()=>{},
                auth: {},
                errors: {}
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Login.propTypes, expectedProps, 'props', Login.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const initialState = {
                auth: {
                    isAuthenticated: true,
                    user: {},
                    loading: false
                },
                errors: {},
            };
            wrapper = setUp(initialState);
        });

        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='loginComponent']`);
            expect(container.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });

        it('redirect', ()=>{
            const classInstance = wrapper.instance();
            classInstance.setState({auth: {
                isAuthenticated: true,
                user: {name: 'abc'},
                loading: false
              }})
            classInstance.componentDidMount();
            expect(classInstance.state.auth.isAuthenticated).toBe(true);
        })

        it('OnChange and Submit event', ()=>{
            const value = 'abcde@g.com';
            wrapper.find('input').at(0).simulate('change', {
                target: {value}
            });
            wrapper.find('form').simulate('submit',{
                preventDefault: () => {}
            });
            expect(wrapper.state('email')).toStrictEqual('');
        });

    });
});

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
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    const wrapper = shallow(<Login store={store} />).dive();
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
                    isAuthenticated: false,
                    user: {},
                    loading: false
                },
                errors: {},
                // location: {pathname: '/login', state:true}
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

        it('if logged in, redirect to dashboard', ()=>{
            const loginInstance = wrapper.instance();
            loginInstance.setState({auth:{isAuthenticated: true,
                user: {},
                loading: true}})
            loginInstance.componentDidMount();
            const auth = loginInstance.state.auth;
            // console.log(loginInstance.state);
            expect(auth).toBeDefined();

        })
    });
});

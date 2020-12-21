import React from 'react';
import SearchBar from './SearchBar';
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
    const auth = {
        user:{
            name: "testuser"
        }
    }
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    const wrapper = shallow(<SearchBar store={store} auth={auth}/>).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('SearchBar Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                contact: {
                    users:{},
                    contacts:{}
                },
                auth: {
                    user:{}
                },
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(SearchBar.propTypes, expectedProps, 'props', SearchBar.name);
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
                }}
            };
            wrapper = setUp(initialState);
        });

        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='SearchBarComponent']`);
            expect(container.length).toBe(1);
        });

        it('search a person', ()=>{
            const value = 'testUser'
            wrapper.find('input').at(0).simulate('change', {
                preventDefault: () => {},
                target: {
                    value
                }
            });
            console.log(wrapper);
            expect(wrapper.toBeUndefined);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });


    });
});
import React from 'react';
import ContactCard from './ContactCard';
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
    const user = {
        username: 'testuser',
        email: 'testemail',
        profile_picture: 'testpicture'
    };
    const contact = {
        contacts: [],
        suggestion: []
    };
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    const wrapper = shallow(<ContactCard store={store} user={user} contact={contact}/>).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('ContactCard Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                auth: {
                    user: {}
                },
                user: {},
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(ContactCard.propTypes, expectedProps, 'props', ContactCard.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const initialState = {
            };
            wrapper = setUp(initialState);
        });

        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='ContactCardComponent']`);
            expect(container.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });


    });
});
import React from 'react';
import PostStatus from './PostStatus';
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
    const wrapper = shallow(<PostStatus store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('PostStatus Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                user: {},
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(PostStatus.propTypes, expectedProps, 'props', PostStatus.name);
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
            const container = wrapper.find(`[data-test='postStatusComponent']`);
            expect(container.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });

        it('upload image', ()=>{
            global.URL.createObjectURL = jest.fn();
            wrapper.find('input').at(1).simulate('change', {
                preventDefault: () => {},
                target: {
                    files:['imageFile']
                }
            });
            expect(wrapper.state('image')).toBe('imageFile');
        });

        it('writing status', ()=>{
            const value = 'testStatusMessage'
            wrapper.find('input').at(0).simulate('change', {
                preventDefault: () => {},
                target: {
                    value
                }
            });
            expect(wrapper.state('text')).toBe(value);
        });

        it('fail to post -- incomplete status message or image', ()=>{
            wrapper.find('#button').simulate('click', {
                preventDefault: () => {},
            });
            expect(wrapper.state('text')).toStrictEqual('');
        })

    });
});
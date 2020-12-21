import React from 'react';
import Row from './Row';
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
    const wrapper = shallow(<Row store={store} />).dive();
    // console.log(wrapper.debug());
    return wrapper;
}

describe('Row Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                chat: {},
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Row.propTypes, expectedProps, 'props', Row.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const initialState = {
                chat:{
                    itemStatusMap:
                    { 1 : 'LOADED'},
                    messages:[{
                        pairId: '',
                        from: 'userA', 
                        to: 'userB',
                        message: 'test message',
                        datetime: '2020/09/01',
                        type: 'text'
                    }],
                    sender: 'userA',
                    receiver: 'userB'
                }
            };
            wrapper = setUp(initialState);
        });

        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='RowComponent']`);
            expect(container.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });


    });
});
import React from 'react';
import Index from './index';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 
import { applyMiddleware, createStore } from 'redux';
import {middleware} from '../../store';
import rootReducer from '../../reducers/index'

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('index(Profile) Component', ()=>{
    describe('Renders', ()=>{
        const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
        const store = createStoreWithMiddleware(rootReducer, {});
        const wrapper = shallow(<Index store={store} />).dive();
        // console.log(wrapper.debug());
        
        it('Should render without errors', ()=>{
            const container = wrapper.find(`[data-test='indexComponent']`);
            expect(container.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });

    });
});

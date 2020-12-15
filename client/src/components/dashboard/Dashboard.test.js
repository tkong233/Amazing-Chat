import React from 'react';
import Dashboard from './Dashboard';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('Dashboard Component', ()=>{
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const props = {
            };
            wrapper = shallow(<Dashboard {...props} />);
        });
        
        it('Should render a dashboard', ()=>{
            const msg = wrapper.find(`[data-test='DashboardComponent']`);
            expect(msg.length).toBe(1);
        })
        

    });
});
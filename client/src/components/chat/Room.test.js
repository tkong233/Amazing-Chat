import React from 'react';
import Room from './Room';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 
import checkPropTypes from 'check-prop-types';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('Room Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                room: '',
                startTime: '',
                endTime: '',
                participants: []
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Room.propTypes, expectedProps, 'props', Room.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const props = {
                room: '',
                startTime: '',
                endTime: '',
                participants: []
            };
            wrapper = shallow(<Room {...props} />);
        });
        
        it('Should render Room', ()=>{
            const room = wrapper.find(`[data-test='RoomComponent']`);
            expect(room.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });
        

    });
});

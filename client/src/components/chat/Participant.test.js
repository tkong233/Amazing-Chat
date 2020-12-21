import React from 'react';
import Participant from './Participant';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 
import checkPropTypes from 'check-prop-types';

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('Participant Component', ()=>{
    describe('Checking PropTypes', ()=>{
        it('Should not throw a warning', ()=>{
            const expectedProps = {
                videoTracks: [],
                audioTracks: [],
            }
            // eslint-disable-next-line react/forbid-foreign-prop-types
            const propsErr = checkPropTypes(Participant.propTypes, expectedProps, 'props', Participant.name);
            expect(propsErr).toBeUndefined();
        })
    });
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            const props = {
                videoTracks: [],
                audioTracks: [],
                participant:{
                    identity: 'testidentity'
                }
            };
            wrapper = shallow(<Participant {...props} />);
        });
        
        it('Should render Participant', ()=>{
            const p = wrapper.find(`[data-test='ParticipantComponent']`);
            expect(p.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });
        

    });
});

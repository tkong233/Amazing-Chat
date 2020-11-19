import React from 'react';
import Chat from './Chat';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});


describe('Chat Component', ()=>{
    describe('Renders', ()=>{
        let wrapper;
        beforeEach(()=>{
            wrapper = shallow(<Chat />);
        });
        
        it('Should render chat', ()=>{
            const join = wrapper.find(`[data-test='ChatComponent']`);
            expect(join.length).toBe(1);
        });

        it('Snapshot testing', ()=>{
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('Event Handlers', ()=>{
        let wrapper;
        beforeEach(()=>{
            wrapper = shallow(<Chat />);
        });
        it('OnChange event editting message', ()=>{
            const value = 'good day';
            wrapper.find('input').at(0).simulate('change', {
                target: {value}
            });
            expect(wrapper.state('message')).toStrictEqual('good day');
        });

        it('successfully join the room', ()=>{
            const classInstance = wrapper.instance();
            const value = 'abc';
            classInstance.setState({room: '1', username:'testuser'});
            wrapper.find('Join').simulate('change', {
                target: {value}
            });
            wrapper.find('Join').simulate('submit', {
                preventDefault: () => {}
            });
            expect(wrapper.state('joined')).toBe(true);
        });
        
        it('should send message', ()=>{
            const classInstance = wrapper.instance();
            classInstance.setState({room: '1', username:'testuser2', joined: true});
            const value = 'good day';
            wrapper.find('input').at(0).simulate('change', {
                target: {value}
            });
            wrapper.find('input').at(0).simulate('keypress', {
                preventDefault: () => {},
                key: 'Enter'
            })
            expect(wrapper.state('message')).toStrictEqual('');
        });

        it('should add message to list', ()=>{
            const classInstance = wrapper.instance();
            const message = 'good good good';
            const user = 'testuser3';
            classInstance.addMessageToList(message, user);
            expect(classInstance.state.messages).toStrictEqual(
                [{
                    text:'good good good', sender: 'testuser3',}]
                );
        })

    });
});

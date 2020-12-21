import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'; 

Enzyme.configure({
    adapter: new EnzymeAdapter(),
});

describe('App Component', ()=>{
  describe('Renders', ()=>{
      let wrapper;
      beforeEach(()=>{
          
          wrapper = shallow(<App />);
      });
      
      it('Should render App', ()=>{
          const app = wrapper.find(`[data-test='AppComponent']`);
          expect(app.length).toBe(1);
      });

      it('Snapshot testing', ()=>{
          expect(wrapper).toMatchSnapshot();
      });
      

  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

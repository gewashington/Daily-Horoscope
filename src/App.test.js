import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
    it('displays horoscope', () => {
      let wrapper = shallow(<App signInputValue="Leo" />)
      const mockSubmit = jest.fn().mockImplementation(() => Promise.resolve(wrapper.setState({userHoroscope: 'This is a mock'})))
      wrapper.instance().onSubmit = mockSubmit
      wrapper.instance().forceUpdate();
      wrapper.find('form').simulate('submit')
      expect(mockSubmit).toHaveBeenCalled()
      expect(wrapper.hasClass('horoscope-output'))
    });
});

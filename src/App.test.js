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
  describe('onSubmit', () => {
    // let wrapper;

    // beforeEach(() => {
    //   wrapper = shallow(<App {...props}/>)
    // })

    fit('retrieves a horoscope', () => {
      let wrapper = shallow(<App signInputValue="Leo" />)
      const mockSubmit = jest.fn()
      wrapper.instance().onSubmit = mockSubmit
      wrapper.instance().forceUpdate();
      wrapper.find('form').simulate('submit')
      expect(mockSubmit).toHaveBeenCalled()
      // wrapper.setProps({signInputValue : 'Leo'});
      // wrapper.find('.submit').click()
      // expect(wrapper.find('.horoscope-output').exists()).toEqual(true)
    })
    // it('logs an error if server cannot be reached')
  })
})
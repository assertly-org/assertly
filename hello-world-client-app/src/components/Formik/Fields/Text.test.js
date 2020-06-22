import React from 'react';
import { shallow } from 'enzyme';
import Text from './Text';

it('renders a text field', () => {
  const mockProps = {
    form: {status: {disabled: false}},
    field: {name: '', value: 'foo'},
  };
  const wrapper = shallow(<Text {...mockProps} />);

  expect(wrapper.find('input.form-control').exists()).toBe(true);
  expect(wrapper.find('input.form-control').first().props().value).toEqual('foo');
});

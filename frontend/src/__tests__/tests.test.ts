import { mount } from '@vue/test-utils';
import { h } from 'vue';

describe('Hello World Component', () => {
  const HelloWorld = {
    render: () => h('div', 'Hello World'),
  };

  test('Should render the Hello World text', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.text()).toBe('Hello World');
  });

  test('Should render as a Div', () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.element.tagName).toBe('DIV');
  });
});
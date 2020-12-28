import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../components/Footer';

describe('<Footer />', () => {
  const footer = mount(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
  test('render Footer compoent', () => {
    expect(footer.length).toEqual(1);
  });

  test('Footer have 3 Link', () => {
    expect(footer.find('Link')).toHaveLength(3);
  });

  test('Footer snapshot', () => {
    const footer = create(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(footer.toJSON()).toMatchSnapshot();
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import MovieFilters from './MovieFilters';

const render = (component) => {
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  return {
    container: div,
    unmount: ReactDOM.unmountComponentAtNode,
  };
};

describe('MovieFilters', () => {
  const {container, unmount} = render(<MovieFilters genres={[]}/>);

  it('renders without crashing', () => {
    expect(container.innerHTML).toBeTruthy();
  });

  it('has class MovieFilters', () => {
    expect(container.firstChild.classList.contains('MovieFilters')).toBe(true);
  });

  afterAll(() => {
    unmount(container);
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import MovieGrid from './MovieGrid';

const render = (component) => {
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  return {
    container: div,
    unmount: ReactDOM.unmountComponentAtNode,
  };
};

describe('MovieGrid', () => {
  const movies = [];
  const {container, unmount} = render(<MovieGrid movies={movies}/>);

  it('renders without crashing', () => {
    expect(container.innerHTML).toBeTruthy();
  });

  it('has class MovieGrid', () => {
    expect(container.firstChild.classList.contains('MovieGrid')).toBe(true);
  });

  it('has class MovieGrid', () => {
    expect(container.firstChild.classList.contains('MovieGrid')).toBe(true);
  });

  it('renders all the children', () => {
    expect(container.querySelectorAll('.MuiGrid-item').length).toBe(movies.length);
  });

  afterAll(() => {
    unmount(container);
  });
});

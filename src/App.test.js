import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const container = document.createElement('div');

describe('MovieGrid', () => {
  beforeAll(() => {
    ReactDOM.render(<App />, container);
  });

  it('renders without crashing', () => {
    expect(container.innerHTML).toBeTruthy();
  });

  it('has class App', () => {
    expect(container.firstChild.classList.contains('App')).toBe(true);
  });

  it('has section App-header', () => {
    expect(container.querySelector('.App-header')).toBeTruthy();
  });

  it('has section App-aside', () => {
    expect(container.querySelector('.App-aside')).toBeTruthy();
  });

  it('has section App-main', () => {
    expect(container.querySelector('.App-main')).toBeTruthy();
  });

  afterAll(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
});

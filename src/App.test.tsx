import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Time to Watch header', () => {
  const { getByText } = render(<App />);
  expect(getByText("Time to Watch")).toBeInTheDocument();
});

test('renders Coming soon paragraph', () => {
  const { getByText } = render(<App />);
  expect(getByText("Coming soon")).toBeInTheDocument();
});

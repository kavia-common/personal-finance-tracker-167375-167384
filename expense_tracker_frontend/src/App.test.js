import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app placeholder', () => {
  render(<App />);
  const el = screen.getByText(/Expense Tracker App/i);
  expect(el).toBeInTheDocument();
});

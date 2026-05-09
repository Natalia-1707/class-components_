import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test error');
};

test('shows fallback UI when error occurs', () => {
  render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>,
  );

  expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
});
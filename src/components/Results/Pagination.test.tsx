import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import Pagination from './Pagination';
import userEvent from '@testing-library/user-event';

test('renders current page number', () => {
  render(
    <Pagination
      page={1}
      hasNextPage={true}
      onPrevPage={() => {}}
      onNextPage={() => {}}
    />
  );

  expect(screen.getByText('2')).toBeInTheDocument();
});

test('click left arrow', async () => {
  const user = userEvent.setup();
  const onPrevPage = vi.fn();

  render(
    <Pagination
      page={1}
      hasNextPage={true}
      onPrevPage={onPrevPage}
      onNextPage={() => {}}
    />
  );

  await user.click(screen.getByText('arrow_circle_left'));

  expect(onPrevPage).toHaveBeenCalled();
});

test('click right arrow', async () => {
  const user = userEvent.setup();
  const onNextPage = vi.fn();

  render(
    <Pagination
      page={1}
      hasNextPage={true}
      onPrevPage={() => {}}
      onNextPage={onNextPage}
    />
  );

  await user.click(screen.getByText('arrow_circle_right'));

  expect(onNextPage).toHaveBeenCalled();
});

test('adds disabled class', () => {
  render(
    <Pagination
      page={0}
      hasNextPage={true}
      onPrevPage={() => {}}
      onNextPage={() => {}}
    />
  );

  const left = screen.getByText('arrow_circle_left');
  expect(left.className).toContain('pagination-disabled');
});
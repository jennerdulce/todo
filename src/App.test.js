// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

test('Renders the title of the page', () => {
  render(<App />)
  const title = screen.getByText('HOME');
  expect(title).toBeInTheDocument();
});

test('Renders initial list items', () => {
  render(<App />)
  const listItems = screen.getAllByLabelText('listItem')
  expect(listItems.length).toBe(5)
});

test('Able to click a list item', () => {
  render(<App />)
  const listItem = screen.getAllByLabelText('listItem')[0]
  // const listItem = screen.getByText('Clean the Kitchen')
  fireEvent.click(listItem)

  const remainingTasks = screen.getByText('There are 3 Items To Complete')
  expect(remainingTasks).toBeInTheDocument();
});

test('Able to add an item', async () => {
  render(<App />)
  // Find Elements
  const form = screen.getByTestId('formTest')
  const taskName = screen.getByTestId('addItemTest')
  const difficulty = screen.getByTestId('difficultyTest')
  const assignee = screen.getByTestId('assigneeTest')

  // Fire fake events
  fireEvent.change(taskName, { target: { name: 'text', value: 'Sweep the floor' } })
  fireEvent.change(difficulty, { target: { name: 'difficulty', value: '3' } })
  fireEvent.change(assignee, { target: { name: 'assignee', value: 'Jenner' } })
  fireEvent.submit(form)

  await waitFor(() => {
    const listItems = screen.getAllByLabelText('listItem')
    screen.getByTestId('formTest')
    screen.getByTestId('addItemTest')
    screen.getByTestId('difficultyTest')
    screen.getByTestId('assigneeTest')
    expect(listItems.length).toBe(6)
  })
})
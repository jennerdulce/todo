import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import App from './App';


let mock = new MockAdapter(axios)

const mockPostsData = [
  { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
  { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
  { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
  { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
  { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' }
];

const mockNewTask = {
  _id: 6,
  complete: false,
  text: "dolorem dolore est ipsam",
  difficulty: 5,
  assignee: 'Test User'
};

describe("Todo Tests", () => {

  mock.onGet("https://api-js401.herokuapp.com/api/v1/todo").reply(200, {
    results: mockPostsData
  })

  it('Should initially render 5 task items', async () => {
    render(<App />)
    await waitFor(() => {
      const items = screen.getAllByLabelText('list-item');
      expect(items.length).toBe(5)
    })
  })

  it('Renders the title of the page', () => {
    render(<App />)
    const title = screen.getByText('HOME');
    expect(title).toBeInTheDocument();
  });

  xit('Creates a new task and adds to the list', async () => {
    render(<App />)
    // 1. Find Elements
    const form = screen.getByTestId('formTest')
    const taskName = screen.getByTestId('addItemTest')
    const difficulty = screen.getByTestId('difficultyTest')
    const assignee = screen.getByTestId('assigneeTest')

    // 2. Fire Fake Events
    fireEvent.change(taskName, { target: { name: 'text', value: 'test' } })
    fireEvent.change(difficulty, { target: { name: 'difficulty', value: '1' } })
    fireEvent.change(assignee, { target: { name: 'assignee', value: 'Jenner' } })
    fireEvent.submit(form)

    // 3. Look for Elements that you updated / created
    await waitFor(() => {
      const listItems = screen.getAllByLabelText('list-item')
      expect(listItems.length).toBe(6)
    })
  });

})

// test('able to fetch data: GET', async () => {
//   // Creates a fake API that you send a request to and you create your own JSON data to send back
//   const serverGet = setupServer(

//     rest.get('http://fake.com', (req, res, ctx) => {
//       // Return fake results that are similar to your API results.
//       // This output should match exactly how youre APP function handles data
//       let data = {
//         headers: 'This is a test Header',
//         data: {
//           results: results,
//         }
//       }
//       return res(ctx.json(data))
//     })
//   )
//   serverGet.listen()

//   render(<App />);
//   // Find the form
//   const form = screen.getByTestId('formTest')
//   // Find the field
//   const urlField = screen.getByTestId('urlTest')
//   // Find the  radio button
//   const radio = screen.getByTestId('radioTestGet')

//   // Fire fake events
//   // Changes 'urlField'
//   fireEvent.change(urlField, { target: { name: 'urlInput', value: 'http://fake.com' } })
//   // Changes on 'radio'
//   fireEvent.click(radio, { target: { name: 'method', value: 'get' } })
//   // Submit 'form'
//   fireEvent.submit(form)

//   // This example works for the code demo because <li> tags are utilized to display pokemon names within the demo.
//   // In my app, this does not work because <li> tags are not being utilized and instead, JSON objects are being returned as a whole which are being passed through a different component to be styled.

//   await waitFor(() => {
//     //   // After submission above, it creates <li> for each object per our code
//     //   // Similar to select query all where selects all the items on the dom and puts them into an array 
//     //   const items = screen.getAllByRole('listItem');
//     //   expect(items.length.toBe(2))
//     // })
//     const headings = screen.getAllByLabelText('testHeader');
//     expect(headings.length).toBe(2)
//     serverGet.close()
//   })
// })

// // test('Renders initial list items', () => {
// //   render(<App />)
// //   const listItems = screen.getAllByLabelText('listItem')
// //   expect(listItems.length).toBe(5)
// // });

// test('Able to click a list item', () => {
//   render(<App />)
//   const listItem = screen.getAllByLabelText('listItem')[0]
//   // const listItem = screen.getByText('Clean the Kitchen')
//   fireEvent.click(listItem)

//   const remainingTasks = screen.getByText('There are 3 Items To Complete')
//   expect(remainingTasks).toBeInTheDocument();
// });

// test('Able to add an item', async () => {
//   render(<App />)
//   // Find Elements
//   const form = screen.getByTestId('formTest')
//   const taskName = screen.getByTestId('addItemTest')
//   const difficulty = screen.getByTestId('difficultyTest')
//   const assignee = screen.getByTestId('assigneeTest')

//   // Fire fake events
//   fireEvent.change(taskName, { target: { name: 'text', value: 'Sweep the floor' } })
//   fireEvent.change(difficulty, { target: { name: 'difficulty', value: '3' } })
//   fireEvent.change(assignee, { target: { name: 'assignee', value: 'Jenner' } })
//   fireEvent.submit(form)

//   await waitFor(() => {
//     const listItems = screen.getAllByLabelText('listItem')
//     screen.getByTestId('formTest')
//     screen.getByTestId('addItemTest')
//     screen.getByTestId('difficultyTest')
//     screen.getByTestId('assigneeTest')
//     expect(listItems.length).toBe(6)
//   })
// })
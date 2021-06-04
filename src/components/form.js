import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

function TodoForm(props) {
  const [item, setItem] = useState({})

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    setItem({});
  }

  return (
    <>
      <form data-testid="formTest" onSubmit={handleSubmit}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Add Item To Do Item</Card.Title>
            <Card.Text>To Do Item</Card.Text>
            <input
              data-testid="addItemTest"
              type="text"
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
            <Card.Text>Difficulty Rating</Card.Text>
            <input 
            data-testid="difficultyTest"
            defaultValue="1" 
            type="range" 
            min="1" 
            max="5" 
            name="difficulty" 
            onChange={handleInputChange} />
            <Card.Text>Assigned To</Card.Text>
            <input 
            data-testid="assigneeTest"
            type="text" 
            name="assignee" 
            placeholder="Assigned To" 
            onChange={handleInputChange} />
            <button>Add Item</button>
            {/* <Button variant="primary">Add Item</Button> */}
          </Card.Body>
        </Card>
      </form>
    </>
  )
}

export default TodoForm;

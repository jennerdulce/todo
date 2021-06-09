import { Toast, Badge, Card, ListGroup } from 'react-bootstrap';

function TodoList(props) {

  let completionStyles = {
    fontSize: '10px', 
    padding: '5px',
    color: 'white', 
    borderRadius: '15px'
  }
  return (
    <>
      {
        props.list.map(item => (
          <Card aria-label="list-item" key={item._id} style={{ width: '40em', marginBottom: '1em' }}>
            <Card.Header className="header-container">
              <span 
              className="pending"
              onClick={() => props.handleComplete(item._id)}
              style={{...completionStyles, backgroundColor: item.complete ? 'green' : 'red' }}>
                {item.complete ? "Completed" : "Pending"}
              </span>
              <span> {item.assignee}</span>
              <span className="deleteItem" value={item.id} onClick={() => props.handleDelete(item._id)}> x</span>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div>{item.text}</div>
                <div className="difficulty">Difficulty: {item.difficulty}</div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      }
    </>
  );
}





// {
//   props.list.map(item => (
//     <Toast key={item._id}>
//       <Toast.Header>
//         <Badge pill
//           variant={item.complete ? "success" : "danger"}
//           onClick={() => props.handleComplete(item._id)}
//         >
//           {item.complete ? "Completed" : "Pending"}
//         </Badge>{' '}
//         <strong className="mr-auto">{item.assignee}</strong>
//       </Toast.Header>
//       <Toast.Body>{item.text}<span>{item.difficulty}</span></Toast.Body>
//     </Toast>
//   ))
// }
export default TodoList
import { useState, useEffect } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Navigation from '../navbar.js';
import TodoForm from '../form.js';
import TodoList from '../list.js';
import useAxios from 'axios-hooks'
import './todo.scss';

function ToDo() {
  const [list, setList] = useState([])
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'https://api-js401.herokuapp.com/api/v1/todo', method: "GET"
  });

  const addItem = (item) => {
    // Creates a few properties
    item.complete = false;
    // Rerenders so that you see in real time
    // Send a request to the API to add this entry to the database
    let url = 'https://api-js401.herokuapp.com/api/v1/todo';
    axios.post(url, item)
      .then(function (response) {
        console.log(response);
        refetch()
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleComplete = async (id) => {
    // Selects single item
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      // Toggles the 'complete' property
      item.complete = !item.complete;
      // Recreates array of tasks and looks for the matching id to swap out that specific item
      let updateItems = list.map(listItem => listItem._id === item._id ? item : listItem);
      // Updates / rerenders the 'list' state
      // Send axios calls to actually make changes on the API
      let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`
      setList(updateItems)
      await axios.put(url, item)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
    // Send axios calls to actually delete on the API
    let url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`
    axios.delete(url)
      .then(function (response) {
        console.log(response);
        refetch()
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // componentDidMount
  useEffect(() => {
    if (data && data.results) {
      console.log('THIS IS DATA: ', data.results)
      setList(data.results)
    }
  }, [data]);

  return (
    <>
      <header>
        <Navigation />
      </header>
      <Container>
        <Navbar bg="dark" expand="sm" variant="dark">
          <Navbar.Brand href="#home">There are {list.filter(item => !item.complete).length} Items To Complete</Navbar.Brand>
        </Navbar>
        <section className="todo">
          <Container>
            <Row>
              <Col sm={4}><TodoForm addItem={addItem} /></Col>
              <Col xs={8}><TodoList
                list={list}
                handleComplete={toggleComplete}
                handleDelete={handleDelete}
              /></Col>
            </Row>
          </Container>
        </section>
      </Container>
    </>
  )
}

export default ToDo;
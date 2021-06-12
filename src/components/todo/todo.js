import { useState, useEffect, useContext } from 'react';
import { Navbar, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import useAxios from 'axios-hooks'
import Navigation from '../navbar/navbar.js';
import TodoForm from '../form/form.js';
import TodoList from '../list/list.js';
import Pagination from '../pagination/pagination.js'
import { SortContext } from '../../context/SortContext.js'
import './todo.scss';

function ToDo() {
  const [list, setList] = useState([])

  // Initial Render
  const [{ data, loading, error }, refetch] = useAxios({
    url: 'https://api-js401.herokuapp.com/api/v1/todo', method: "GET"
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentList = list.slice(indexOfFirstPost, indexOfLastPost);

  // Context
  let { sort, setSort } = useContext(SortContext);

  useEffect(() => {
    switch (sort) {
      case 'all':
        setList(data.results)
        break;
      case 'completed':
        let completedList = data.results.filter(value => value.complete)
        setList(completedList)
        break;
      case 'incomplete':
        let incompleteList = data.results.filter(value => value.complete === false)
        setList(incompleteList)
        break;
      case 'ascending':
        let ascending = data.results.sort(function (a, b) {
          return b.difficulty - a.difficulty;
        });
        setList(ascending)
        break;
      case 'descending':
        let descending = data.results.sort(function (a, b) {
          return a.difficulty - b.difficulty;
        })
        setList(descending)
        break;
      default:
      //
    }
  }, [sort, list])

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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // componentDidMount
  useEffect(() => {
    if (data && data.results) {
      // Initially only render 'Incomplete' Tasks
      console.log(data.results)
      let incompleteList = data.results.filter(value => value.complete === false)
      let completedList = data.results.filter(value => value.complete)
      let sortByCompletion = incompleteList.concat(completedList)
      console.log(sortByCompletion)
      setList(sortByCompletion)
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
                list={currentList}
                handleComplete={toggleComplete}
                handleDelete={handleDelete}
              />
                <div className="control-items">
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={list.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                  <DropdownButton id="dropdown-basic-button" title="Sort">
                    <Dropdown.Item onClick={() => setSort('all')} >All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSort('completed')} >Completed</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSort('incomplete')}>Incomplete</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSort('ascending')}>Difficulty (ascending)</Dropdown.Item>
                    <Dropdown.Item onClick={() => setSort('descending')}>Difficulty (descending)</Dropdown.Item>
                  </DropdownButton>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </>
  )
}

export default ToDo;
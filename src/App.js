import React, {useState, useMemo} from 'react'
import ToDo from './components/todo/todo.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SortContext} from './context/SortContext'

  function App() {
    const [sort, setSort] = useState("")
    const providerSort = useMemo(() => ({sort, setSort}), [sort, setSort])
    return (
      <>
        <SortContext.Provider value={providerSort}>
          <ToDo />
        </SortContext.Provider>
      </>
    );
  }

export default App;

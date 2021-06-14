import React, {useEffect, useState} from 'react';
import './App.css';
import {Modal, Search, EmptyLine, SortByField} from './components'
import { getTodoItems, updateTodoItem, createTodoItem, deleteTodoItem } from './api/Api';
import {Pagination, TodoItem} from "./interfaces";


function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [sort, setSorting] = useState('');
  const [sortAsc, setSortAsc] = useState('asc');
  const [activeItem, setActiveItem] = useState<TodoItem>({ title: "", description: "", completed: false });
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({ current: 1 });

  const refreshList = () =>{
    getTodoItems({ setResult: setTodoList, setPagination  });
  }

  useEffect(() => {
    if (shouldRefresh) {
      refreshList();
      setShouldRefresh(false);
    }

  }, [shouldRefresh]);

  /*
  * Button Handlers
  * */

  const handleSubmit = (item : TodoItem) => {
    toggle();

    if (item.id) {
      updateTodoItem(item, refreshList);
      return;
    }
    createTodoItem(item, refreshList);
  }

  const handleSearch = () => {
    getTodoItems({ filter, setResult: setTodoList, setPagination, sort });
  }

  const handleSortItems = () => {
    if (!sortField || sortField === 'empty') return;
    const sorting = `${(sortAsc === 'asc' ? '' : '-')}${sortField}`;
    setSorting(sorting);

    getTodoItems({ sort, setResult: setTodoList, setPagination, filter });
  }

  const handlePageChange = (e : any) => {
     let { name } = e.target;
     const page = name.split('-')[1];
    getTodoItems({ setResult: setTodoList, setPagination, filter, page, sort  });
  }

  const handleCompletedChange = (status:boolean) => {
    setViewCompleted(status);
  }

  const toggle = () => setModal(!modal);


  /**
   * CRUD Operations
   */
  const deleteItem = (item : TodoItem) => {
    deleteTodoItem(item, refreshList);
  }

  const createItem = () => {
    const item : TodoItem = { title: "", completed: false, description: "" };
    setActiveItem(item);
    toggle();
  }

  const editItem = (item : TodoItem) => {
    setActiveItem(item);
    toggle();
  }


  /**
   * Render Functions
   */

  const renderTabList = () => {
    return (
        <div className="nav nav-tabs">
          <span
              className={viewCompleted ? "nav-link active" : "nav-link"}
              onClick={() => handleCompletedChange(true)}>
            Complete
          </span>

          <span
              className={viewCompleted ? "nav-link": "nav-link active"}
              onClick={() => handleCompletedChange(false)}>
            Incomplete
          </span>
        </div>
    );
  }

  const renderItems = () => {
    const newItems = todoList.filter(item => item.completed === viewCompleted);

    return newItems.map(item =>
        (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span className={`todo-tile mr-2 ${viewCompleted ? 'completed-todo' : ''}`}>{item.title}</span>
              <span>
                <button
                  className="btn btn-secondary mr-2"
                  onClick={ () => editItem(item) }
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={ () => deleteItem(item) }
                >
                  Delete
                </button>
              </span>
            </li>
        ));
  }

  const renderPagination = () => {

    const totalPages = Math.floor((pagination.count ? pagination.count : 0) / 3);
    const rows : JSX.Element[] = [];

    for (let i = 1; i <= totalPages; i++) {
      rows.push(<li className="page-item"><button className="page-link" onClick={handlePageChange} name={`page-${i}`} id={`page-${i}`} key={`page-${i}`}>{i}</button></li>);
    }

    return (
        <nav aria-label="items pagination">
          <ul className="pagination pagination-sm justify-content-end">
            {rows}
          </ul>
        </nav>
    );
  }

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-lg-4"/>
        <div className="col-lg-4">
          <Search onSearchFn={handleSearch} filter={filter} setFilter={setFilter} />
        </div>
        <div className="col-lg-4"/>
      </div>
      <EmptyLine />
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <div className="row">
                <div className="col-lg-6">
                  <button
                    className="btn btn-primary"
                    onClick={createItem}>
                    Add task
                  </button>
                </div>
                <div className="col-lg-6">
                  <SortByField sortFn={handleSortItems} setSortField={setSortField} sortField={sortField} setSortAsc={setSortAsc} sortAsc={sortAsc} />
                </div>
              </div>

            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
            {renderPagination()}
          </div>
        </div>
      </div>
      {
        modal ?
            (<Modal
                activeItem={activeItem}
                toggle={toggle}
                onSave={handleSubmit}
            />)
            :
            null
      }
    </main>
  );
}

export default App;

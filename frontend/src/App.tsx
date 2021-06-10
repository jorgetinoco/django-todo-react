import React, {useEffect, useState} from 'react';
import './App.css';
import Modal from './components/Modal';
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

interface TodoItem {
  id?: number,
  title: string,
  description: string,
  completed: boolean
}

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState<TodoItem>({ title: "", description: "", completed: false });

  useEffect(() => {
    refreshList();
  });

  const refreshList = () =>{
    axios
        .get('/api/todos/')
        .then(res => setTodoList(res.data))
        .catch(err => console.error(err));
  }

  const displayCompleted = (status:boolean) => {
    setViewCompleted(status);
  }

  const toggle = () => setModal(!modal);

  const handleSubmit = (item : TodoItem) => {
    toggle();

    if (item.id) {
      axios.put(`/api/todos/${item.id}/`,item)
          .then(res => refreshList())
          .catch(err => console.error(err));
      return;
    }

    axios
      .post("/api/todos/", item)
      .then((res) => {
        console.log(res);
        refreshList()
      })
      .catch(err => console.error(err));

  }

  const deleteItem = (item : TodoItem) => {
    axios
        .delete(`/api/todos/${item.id}/`)
        .then((res) => refreshList())
        .catch(err => console.error(err));
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

  const renderTabList = () => {
    return (
        <div className="nav nav-tabs">
          <span
              className={viewCompleted ? "nav-link active" : "nav-link"}
              onClick={() => displayCompleted(true)}>
            Complete
          </span>

          <span
              className={viewCompleted ? "nav-link": "nav-link active"}
              onClick={() => displayCompleted(false)}>
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

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={createItem}
              >
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
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

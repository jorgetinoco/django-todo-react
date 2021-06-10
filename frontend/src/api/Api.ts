import axios from "axios";
import {TodoItem} from "../interfaces";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const getTodoItems = (setResult : any) => {
    axios
        .get('/api/todos/')
        .then(res => setResult(res.data))
        .catch(err => console.error(err));
}

const updateTodoItem = (item : TodoItem, refreshFunction : any) => {
    axios.put(`/api/todos/${item.id}/`,item)
          .then(res => refreshFunction())
          .catch(err => console.error(err));
}

const createTodoItem = (item : TodoItem, refreshFunction : any) => {
    axios
      .post("/api/todos/", item)
      .then((res) => refreshFunction())
      .catch(err => {
          console.log(err);
          console.error(err);
      });
}

const deleteTodoItem = (item : TodoItem, refreshFunction : any) => {
    axios
        .delete(`/api/todos/${item.id}/`)
        .then((res) => refreshFunction())
        .catch(err => console.error(err));
}

export {
    getTodoItems,
    updateTodoItem,
    createTodoItem,
    deleteTodoItem
}

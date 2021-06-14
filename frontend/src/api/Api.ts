import axios from "axios";
import {Pagination, TodoItem} from "../interfaces";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

interface ApiOperations {
    setResult: any,
    setPagination: any,
    filter?: string,
    sort?: string,
    page?: number
}

interface ApiResponse {
    count: number,
    next?: string,
    previous?: string,
    results: TodoItem[]
}

const getTodoItems = (operations : ApiOperations) => {
    let filterQueryParam = '';
    let sortQueryParam = '';
    let pageQueryParam = '';

    if (operations.filter) {
        filterQueryParam = `?search=${operations.filter}`;
    }

    if (operations.sort) {
        let starting = '&';
        if (!filterQueryParam) {
            starting = '?'
        }
        sortQueryParam = `${starting}ordering=${operations.sort}`;
    }

    if (operations.page) {
        let starting = '&';
        if (!filterQueryParam && !sortQueryParam) {
            starting = '?'
        }
        pageQueryParam = `${starting}page=${operations.page}`;
    }

    const getParams = (url : string) => {
        const paramsStartingPos = url.indexOf('?');
        return url.substr(paramsStartingPos);
    }

    axios
        .get(`/api/todos/${filterQueryParam}${sortQueryParam}${pageQueryParam}`)
        .then(res => {
            const response : ApiResponse = res.data;
            let next = 0;
            let prev = 0;

            if (response.next) {
                const urlSearchParams = new URLSearchParams(getParams(response.next));
                if (urlSearchParams.has('page')) {
                    next = parseInt(urlSearchParams.get('page') as string);
                }
            }

            if (response.previous) {
                const urlSearchParams = new URLSearchParams(getParams(response.previous));
                if (urlSearchParams.has('page')) {
                    prev = parseInt(urlSearchParams.get('page') as string);
                }
            }

            operations.setResult(response.results);
            operations.setPagination({ current: operations.page, count: response.count, next, prev, filter: operations.filter, sort: operations.sort } as Pagination);
        })
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

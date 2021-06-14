export interface TodoItem {
  id?: number,
  title: string,
  description: string,
  completed: boolean,
  priority?: string,
  due_date?: Date
}

export interface Pagination {
  current: number,
  count?: number,
  next?: number,
  prev?: number,
  filter?: string,
  sort?: string
}

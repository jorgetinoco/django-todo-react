export interface TodoItem {
  id?: number,
  title: string,
  description: string,
  completed: boolean,
  priority?: string,
  dueDate?: string
}

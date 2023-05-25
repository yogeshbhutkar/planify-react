type Login = {
  username: string;
  password: string;
};

type Board = {
  count: number;
  next: string;
  previous: string;
  results: Result[];
};

type Result = {
  id: number;
  created_date: string;
  modified_date: string;
  title: string;
  description: string;
};

type BoardForm = {
  title: string;
  description: string;
};

type Stages = {
  count: number;
  next: string;
  previous: string;
  results: Result[];
};

type Stage = {
  title: string;
  description: string;
};

type Task = {
  count: number;
  next: string;
  previous: string;
  results: TaskResult[];
};

type TaskResult = {
  id: number;
  board_object: Result;
  status_object: Result;
  created_date: string;
  modified_date: string;
  title: string;
  description: string;
  board: number;
};

type PostTaskPayload = {
  id?: number;
  board_object: TaskObject;
  status_object: TaskObject;
  created_date: string;
  modified_date: string;
  title: string;
  description: string;
  board: number;
};

type TaskForm = {
  title: string;
  dueDate: string;
  description: string;
  created_on: string;
};

type TaskUpdate = {
  title: string;
  description: string;
  created_on: string;
};

type TaskObject = {
  title: string;
  description: string;
};

type Register = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

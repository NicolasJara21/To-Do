export type Action =
  | { type: "addTask"; text: string }
  | { type: "removedTask"; id: number }
  | { type: "completed"; id: number };

export type Task = {
  text: string;
  id: number;
  completed: boolean;
};

export const taskReducer = (state: Task[], action: Action) => {
  switch (action.type) {
    case "addTask":
      return [...state, { text: action.text, id: Date.now(), completed: false }];
    case "removedTask":
      return state.filter((data) => data.id != action.id);
    case "completed":
      return state.map((item) => (item.id === action.id ? {...item, completed:!item.completed} : item));
    default:
      return state;
  }
};

const initialstate = null;

export default function (store = initialstate, action) {
  switch (action.type) {
    case "SET_LISTS":
      return [...action.payload];

    case "DELET_LIST_ITEM":
      return store.filter((item) => item._id !== action.payload);

    case "ADD_NEW_LIST":
      return [...store, action.payload];

    case "SET_NEW_NAME_LIST":
      return store.map((item) => {
        return item._id === action.payload._id
          ? { ...item, name: action.payload.name }
          : item;
      });

    case "SET_NEW_NAME_TASKS":
      return store.map((item) =>
        item._id === action.payload.listId
          ? (item = {
              ...item,
              tasks: item.tasks.map((task) =>
                task._id === action.payload._id
                  ? (task = {
                      ...task,
                      text: action.payload.text,
                      completed: false,
                    })
                  : task
              ),
            })
          : item
      );

    case "ADD_NEW_TASK":
      return store.map((item) =>
        item._id === action.payload.listId
          ? (item = {
              ...item,
              tasks: [...item.tasks, action.payload],
            })
          : item
      );

    case "DELET_TASK":
      return store.map((item) =>
        item._id === action.payload.listId
          ? (item = {
              ...item,
              tasks: item.tasks.filter(
                (task) => task._id !== action.payload._id
              ),
            })
          : item
      );

    case "TOGGLE_COMPLIT_TODO":
      return store.map((item) =>
        item._id === action.payload.listId
          ? (item = {
              ...item,
              tasks: item.tasks.map((task) =>
                task._id === action.payload._id
                  ? (task = { ...task, completed: !task.completed })
                  : task
              ),
            })
          : item
      );

    default:
      return store;
  }
}

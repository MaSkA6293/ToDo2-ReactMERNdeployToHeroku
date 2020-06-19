export const setLists = (lists) => {
  return {
    type: "SET_LISTS",
    payload: lists,
  };
};

export const addNewList = (obj) => {
  return {
    type: "ADD_NEW_LIST",
    payload: obj,
  };
};

export const del = (id) => {
  return {
    type: "DELET_LIST_ITEM",
    payload: id,
  };
};

export const EditNameList = (_id, newName) => {
  return {
    type: "SET_NEW_NAME_LIST",
    payload: {
      _id,
      name: newName,
    },
  };
};

export const editTaskText = (_id, newName, listId) => {
  return {
    type: "SET_NEW_NAME_TASKS",
    payload: {
      _id: _id,
      text: newName,
      listId: listId,
    },
  };
};

export const deletTask = (_id, listId) => {
  return {
    type: "DELET_TASK",
    payload: {
      _id,
      listId,
    },
  };
};

export const complitToDo = (_id, listId, completed) => {
  return {
    type: "TOGGLE_COMPLIT_TODO",
    payload: {
      _id,
      listId,
      completed,
    },
  };
};

export const editTaskName = (action) => {
  return {
    type: "SET_TASKS",
    payload: action,
  };
};

export const addNewTask = (obj) => {
  return {
    type: "ADD_NEW_TASK",
    payload: obj,
  };
};

import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  complitToDo,
  editTaskText,
  deletTask,
  addNewTask,
  setLists,
  EditNameList,
} from "../actions/actionLists";
import {
  closePanelAddNewTask,
  openPanelAddTask,
  onActivItem,
} from "../actions/actionStateApp";

import Contentpanel from "../components/Contentpanel";

const Contentpanels = ({
  editTaskText,
  EditNameList,
  item,
  empty,
  complitToDo,
  stateApp,
  deletTask,
  openPanelAddTask,
  addNewTask,
  closePanelAddNewTask,
}) => {
  const toggleCompleted = (_id, listId, completed) => {
    axios
      .put("/tasks/" + _id, { completed: !completed })
      .then(() => complitToDo(_id, listId, completed))
      .catch(() => {
        alert("Не удалось обновить статус задачи не удалось");
      });
  };

  const oneditTaskText = (curentTask) => {
    const newName = window.prompt("Введите новое значение", curentTask.text);
    if (newName) {
      axios
        .put("/tasks/" + curentTask._id, {
          text: newName,
          completed: false,
        })
        .then(() => editTaskText(curentTask._id, newName, curentTask.listId))
        .catch(() => alert("Не удалось обновить название списка"));
    }
  };

  const onEditNameList = (item) => {
    const newName = global.prompt("Введите новое значение", item.name);
    if (newName) {
      axios
        .put("/lists/" + item._id, { name: newName })
        .then(() => EditNameList(item._id, newName))
        .catch(() => alert("Не удалось обновить название списка"));
    }
  };

  const ondeletTask = (_id, listId) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      axios
        .delete("/tasks/" + _id)
        .then(() => deletTask(_id, listId))
        .catch(() => alert("Ошибка удаления"));
    }
  };

  return (
    <Contentpanel
      item={item}
      empty={empty}
      stateApp={stateApp}
      openPanelAddTask={openPanelAddTask}
      addNewTask={addNewTask}
      closePanelAddNewTask={closePanelAddNewTask}
      toggleCompleted={toggleCompleted}
      oneditTaskText={oneditTaskText}
      onEditNameList={onEditNameList}
      ondeletTask={ondeletTask}
      onActivItem={onActivItem}
    />
  );
};

function mapStateToProps({ stateApp, lists }) {
  return {
    stateApp,
    lists,
    activitem: stateApp.activitem,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      complitToDo,
      editTaskText,
      deletTask,
      openPanelAddTask,
      addNewTask,
      closePanelAddNewTask,
      setLists,
      EditNameList,
      onActivItem,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Contentpanels);

import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import List from "../components/List";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { del } from "../actions/actionLists";
import { onActivItem } from "../actions/actionStateApp";

const Lists = ({
  items,
  onActivItem,
  btn,
  allListTask,
  stateApp,
  delet,
  buttonMobyle,
  toggleMobyleMenu,
}) => {
  let history = useHistory();

  const deletItem = (_id) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      console.log(_id);
      axios
        .delete("/lists/" + _id)
        .then(() => delet(_id))
        .catch(() => alert("Ошибка удаления"));
    }
  };

  return (
    <List
      items={items}
      btn={btn}
      onActivItem={onActivItem}
      allListTask={allListTask}
      deletItem={deletItem}
      stateApp={stateApp}
      history={history}
      buttonMobyle={buttonMobyle}
      toggleMobyleMenu={toggleMobyleMenu}
    />
  );
};

function mapStateToProps({ colors, tasks, stateApp }) {
  return {
    colors,
    tasks,
    stateApp,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      delet: del,
      onActivItem,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);

import React from "react";
import PropTypes from "prop-types";
import "./List.scss";
import iconDelet from "../../assets/img/deletItem.svg";

import classnames from "classnames";

import Marker from "../Marker";

const List = ({
  items,
  btn,
  onActivItem,
  allListTask,
  stateApp,
  deletItem,
  history,
  buttonMobyle,
  toggleMobyleMenu,
}) => {
  return (
    <ul className={classnames("list")}>
      {items.map((item, index) => (
        <li
          key={index}
          className={classnames(
            stateApp.activitem && stateApp.activitem._id === item._id
              ? "list_activ"
              : "",
            item.name === "Все задачи" && !stateApp.activitem
              ? "list_activ"
              : ""
          )}
          onClick={
            !allListTask
              ? () => {
                  onActivItem(item);
                  history.push(`/lists/${item._id}`);
                }
              : () => {
                  onActivItem(null);
                  history.push("/");
                }
          }
        >
          {item.icon ? (
            <img src={item.icon} alt="img" className="list__icon" />
          ) : (
            <Marker addclass="marker" color={item.color.hex} />
          )}
          <span className="list__nameList">{item.name}</span>
          {btn ? <span>[{item.tasks.length}]</span> : ""}
          {btn ? (
            <div className="list__delet" onClick={() => deletItem(item._id)}>
              <img src={iconDelet} alt="close" />
            </div>
          ) : (
            ""
          )}
          {buttonMobyle ? (
            <div className="list__menuMobyle" onClick={toggleMobyleMenu}>
              {" "}
              <span />
            </div>
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  items: PropTypes.array,
  btn: PropTypes.bool,
  onActivItem: PropTypes.func,
  allListTask: PropTypes.bool,
  stateApp: PropTypes.object,
  history: PropTypes.object,
  deletItem: PropTypes.func,
  mobyle: PropTypes.string,
};

export default List;

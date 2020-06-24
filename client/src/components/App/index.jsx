import React, { useEffect } from "react";
import "./App.scss";
import Leftpanel from "../../containers/Leftpanel";
import axios from "axios";
import ContentPanels from "../../containers/Contentpanel";
import { Route, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const App = ({
  setLists,
  lists,
  activitem,
  onActivItem,
  loadingList,
  toggleLoadingList,
  setColors,
  openPanelAddList,
}) => {
  const history = useHistory();

  useEffect(() => {
    async function getAllData() {
      const Promislists = axios.get("/lists").then(({ data }) => data);
      const Promistasks = axios.get("/tasks").then(({ data }) => data);
      const Promiscolors = axios.get("/colors").then(({ data }) => data);

      Promise.all([Promislists, Promistasks, Promiscolors]).then((results) => {
        const state = results[0].map((item) => {
          return {
            ...item,
            tasks: results[1].filter((task) => task.listId === item._id),
            color: results[2].filter((color) => color.id === item.colorId)[0],
          };
        });
        setLists(state);

        setColors(results[2]);

        toggleLoadingList(false);
      });
    }
    getAllData();
  }, []);

  useEffect(() => {
    const id = history.location.pathname.split("lists/")[1];
    console.log(id);
    if (lists) {
      const activ = lists.find((li) => li._id === id);

      if (!activ) {
        history.push("/");
        onActivItem(null);
      } else {
        onActivItem(activ);
        openPanelAddList(false);
      }
    }
  }, [lists, history.location.pathname]);

  return (
    <div className="App">
      <Route exact path="/">
        {!loadingList ? <Leftpanel /> : "Загрузка"}
        <div className="App__contentAll">
          {!loadingList
            ? lists.map((item, index) => {
                return <ContentPanels key={index} item={item} empty={true} />;
              })
            : "Загрузка"}
        </div>
      </Route>
      <Route path="/lists/:id">
        {!loadingList ? <Leftpanel /> : "Загрузка"}
        {!loadingList && activitem ? (
          <ContentPanels item={activitem} />
        ) : (
          "Загрузка"
        )}
      </Route>
    </div>
  );
};

App.propTypes = {
  setLists: PropTypes.func,
  setColors: PropTypes.func,
  lists: PropTypes.array,
  activitem: PropTypes.object,
  onActivItem: PropTypes.func,
  loadingList: PropTypes.bool,
  toggleLoadingList: PropTypes.func,
  openPanelAddList: PropTypes.func,
};

export default App;

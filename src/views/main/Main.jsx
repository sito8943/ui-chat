import React, { useState, useEffect } from "react";

import { useContext } from "../../context/ContextProvider";

const Main = (props) => {
  const { contextState, setContextState } = useContext();
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    switch (e.target.id) {
      case "search":
        return setSearch(e.value);

      default:
        break;
    }
  };

  return (
    <div classNameName="main">
      <nav class="uk-navbar-container" data-uk-navbar>
        <div class="uk-navbar-left">
          <a class="uk-navbar-item uk-logo" href="#">
            <img src="/logo192.png" alt="app-logo" style={{ height: "60px" }} />
          </a>
          <div class="uk-navbar-item">
            <form action="javascript:void(0)">
              <input
                class="uk-input uk-form-width-small"
                type="text"
                id="search"
                placeholder={props.texts.Placeholders.Search}
                value={search}
                onChange={handleInput}
              />
            </form>
          </div>
        </div>
        <div class="uk-navbar-right">
          <ul class="uk-navbar-nav">
            <li class="uk-active">
              <a href="#">Active</a>
            </li>
            <li>
              <a href="#">Parent</a>
              <div class="uk-navbar-dropdown">
                <ul class="uk-nav uk-navbar-dropdown-nav">
                  <li class="uk-active">
                    <a href="#">Active</a>
                  </li>
                  <li>
                    <a href="#">Item</a>
                  </li>
                  <li>
                    <a href="#">Item</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="#">Item</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="uk-grid-collapse uk-text-center" data-uk-grid>
        <div className="uk-width-medium">
          <div className="uk-background-muted uk-padding">Item</div>
        </div>
        <div className="uk-width-expand ">
          <div className="uk-background-primary  uk-padding uk-light">Item</div>
        </div>
      </div>
    </div>
  );
};

export default Main;

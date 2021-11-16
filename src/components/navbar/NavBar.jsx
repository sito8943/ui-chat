import React, { useState, useEffect } from "react";
import { useContext } from "../../context/ContextProvider";

const NavBar = (props) => {
  const { contextState, setContextState } = useContext();
  const [search, setSearch] = useState("");

  const init = async () => {};

  useEffect(() => {}, []);

  const handleInput = (e) => {
    switch (e.target.id) {
      default:
        return setSearch(e.target.value);
    }
  };

  return (
    <nav className="uk-navbar-container" data-uk-navbar>
      <div className="uk-navbar-left">
        <a className="uk-navbar-item uk-logo" href="#">
          <img src="/logo192.png" alt="app-logo" style={{ height: "60px" }} />
        </a>
        <div className="uk-navbar-item">
          <form action="javascript:void(0)">
            <input
              className="uk-input uk-form-width-small"
              type="text"
              id="search"
              placeholder={props.texts.Placeholders.Search}
              value={search}
              onChange={handleInput}
            />
          </form>
        </div>
      </div>
      <div className="uk-navbar-right uk-visible@m">
        <ul className="uk-navbar-nav">
          <li className="uk-active">
            <a href="#">Active</a>
          </li>
          <li>
            <a href="#">Parent</a>
            <div className="uk-navbar-dropdown">
              <ul className="uk-nav uk-navbar-dropdown-nav">
                <li className="uk-active">
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
  );
};

export default NavBar;

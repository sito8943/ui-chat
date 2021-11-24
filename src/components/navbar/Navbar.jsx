import React, { useState, useEffect } from "react";
import { useContext } from "../../context/ContextProvider";
import { SettingsIcon, XIcon } from "../../icons/icons";

import { Outlet, Link } from "react-router-dom";

import ChatItemPlaceholder from "../../components/chatItem/ChatItemPlaceholder";
import ChatItem from "../../components/chatItem/ChatItem";

const Navbar = (props) => {
  const { contextState, setContextState } = useContext();
  const [search, setSearch] = useState("");

  const init = async () => {};

  useEffect(() => {
    init();
  }, []);

  const handleInput = (e) => {
    switch (e.target.id) {
      default:
        return setSearch(e.target.value);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {contextState.user.name == "" ? (
        <></>
      ) : (
        <nav className="uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <Link className="uk-navbar-item uk-logo" to="#">
              <img
                src="/logo192.png"
                alt="app-logo"
                style={{ height: "60px" }}
              />
            </Link>
            <div className="uk-navbar-item ">
              <form action="javascript:void(0)">
                <input
                  className="uk-input uk-form-width-small"
                  type="search"
                  id="search"
                  placeholder={props.texts.Placeholders.Search}
                  value={search}
                  onChange={handleInput}
                />
              </form>
            </div>
          </div>

          <div className="uk-navbar-right uk-visible@m">
            <ChatItem data={contextState.user} /> 
            <ul className="uk-navbar-nav">
              <li className="uk-active">
                <Link to="#">Active</Link>
              </li>
              <li>
                <a href="#">Parent</a>
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li className="uk-active">
                      <Link to="#">Active</Link>
                    </li>
                    <li>
                      <Link to="#">Item</Link>
                    </li>
                    <li>
                      <Link to="#">Item</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Link to="#">Item</Link>
              </li>
            </ul>
          </div>

          <div className="uk-navbar-right uk-hidden@m">
            <button
              className="uk-button uk-button-default uk-margin-small-right menu-button"
              type="button"
              data-uk-toggle="target: #offcanvas-usage"
              style={{ fontSize: "1.5rem", marginBottom: "6px" }}
            >
              <SettingsIcon />
            </button>
          </div>
          <div>
            <div id="offcanvas-usage" data-uk-offcanvas>
              <div className="uk-offcanvas-bar">
                <button className="uk-offcanvas-close" type="button">
                  <XIcon />
                </button>

                <ChatItem data={contextState.user} />

                <h3>Title</h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </div>
  );
};

export default Navbar;

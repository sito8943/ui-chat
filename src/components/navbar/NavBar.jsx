import React, { useState, useEffect } from "react";
import { useContext } from "../../context/ContextProvider";
import { Image, Shimmer } from "react-shimmer";
import {
  IdleIcon,
  DotIcon,
  SettingsIcon,
  XIcon,
  DontDisturbIcon,
} from "../../icons/icons";

const NavBar = (props) => {
  const { contextState, setContextState } = useContext();
  const [search, setSearch] = useState("");
  const [alternative, setAlternative] = useState(true);

  const init = async () => {};

  useEffect(() => {
    setTimeout(() => {
      setAlternative(!alternative);
    }, 50000);
  }, [alternative]);

  const printStateIcon = () => {
    switch (contextState.user.state) {
      case "offline":
        return (
          <span className="offline state-icon">
            <DotIcon />
          </span>
        );
      case "idle":
        return (
          <span className="idle state-icon">
            <IdleIcon />
          </span>
        );
      case "dont-disturb":
        return (
          <span className="dont-disturb state-icon">
            <DontDisturbIcon />
          </span>
        );
      default:
        return (
          <span className="online state-icon">
            <DotIcon />
          </span>
        );
    }
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      default:
        return setSearch(e.target.value);
    }
  };

  return (
    <nav className="uk-navbar-container" data-uk-navbar>
      {!alternative ? (
        <div className="uk-navbar-left">
          <a className="uk-navbar-item uk-logo" href="#">
            <img src="/logo192.png" alt="app-logo" style={{ height: "60px" }} />
          </a>
          <div className="uk-navbar-item ">
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
      ) : (
        <div className="uk-navbar-left">
          <a className="uk-navbar-item uk-logo" href="#">
            <Image
              src="https://robohash.org/138.246.253.15.png"
              fallback={<Shimmer width={50} height={50} />}
            />
          </a>
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <a href="#">{contextState.user.name}</a>
            </li>
            <li>
              <a href="">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {printStateIcon()}

                  <span>{contextState.user.state}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      )}
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
      <div className="uk-navbar-right uk-hidden@m">
        <button
          className="uk-button uk-button-default uk-margin-small-right menu-button"
          type="button"
          data-uk-toggle="target: #offcanvas-usage"
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

            <h3>Title</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

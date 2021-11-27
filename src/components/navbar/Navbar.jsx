import React, { useState, useEffect } from "react";
import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import {
  SettingsIcon,
  XIcon,
  DarkModeIcon,
  LightModeIcon,
} from "../../icons/icons";

import { Outlet, Link } from "react-router-dom";

import ChatItemPlaceholder from "../../components/chatItem/ChatItemPlaceholder";
import ChatItem from "../../components/chatItem/ChatItem";
import Input from "../theme/form/Input";

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

  const toggleMode = (e) => {
    contextState.mode === "light"
      ? setContextState({ type: "changeMode", mode: "dark" })
      : setContextState({ type: "changeMode", mode: "light" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <nav
        className="uk-navbar-container navbar"
        data-uk-navbar
        style={{
          backgroundColor:
            contextState.mode === "light"
              ? colors.LightBarBackground
              : colors.DarkBarBackground,
          boxShadow: `1px 1px 5px 1px ${
            contextState.mode === "light"
              ? colors.LightShadows
              : colors.DarkShadows
          }`,
        }}
      >
        <div className="uk-navbar-left">
          <Link className="uk-navbar-item uk-logo" to="#">
            <img src="/logo192.png" alt="app-logo" style={{ height: "60px" }} />
          </Link>
          <div className="uk-navbar-item ">
            <form action="javascript:void(0)">
              <Input
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
          {contextState.user.name == "" ? (
            <></>
          ) : (
            <ChatItem data={contextState.user} />
          )}

          <button
            id="toggler"
            type="button"
            style={{
              color:
                contextState.mode === "light"
                  ? colors.LightFontColors
                  : colors.DarkFontColors,
            }}
            className="uk-button uk-button-default uk-margin-small-right menu-button navbar-button"
            onClick={toggleMode}
          >
            {contextState.mode === "light" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </button>
          <ul className="uk-navbar-nav">
            <li className="uk-active"></li>
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
            className="uk-button uk-button-default uk-margin-small-right menu-button navbar-button"
            type="button"
            data-uk-toggle="target: #offcanvas-usage"
            style={{
              fontSize: "1.5rem",
              marginBottom: "10px",
              color:
                contextState.mode === "light"
                  ? colors.LightFontColors
                  : colors.DarkFontColors,
            }}
          >
            <SettingsIcon />
          </button>
        </div>
        <div>
          <div id="offcanvas-usage" data-uk-offcanvas>
            <div
              className="uk-offcanvas-bar"
              style={{
                backgroundColor:
                  contextState.mode === "light"
                    ? colors.LightOffCanvas
                    : colors.DarkOffCanvas,
                boxShadow: `1px 5px 1px 1px ${
                  contextState.mode === "light"
                    ? colors.LightShadows
                    : colors.DarkShadows
                }`,
              }}
            >
              <button className="uk-offcanvas-close" type="button">
                <XIcon />
              </button>

              {contextState.user.name == "" ? (
                <></>
              ) : (
                <ChatItem
                  data={contextState.user}
                  color={
                    contextState.mode === "light"
                      ? colors.LightFontColors
                      : colors.DarkFontColors
                  }
                />
              )}

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
      <Outlet />
    </div>
  );
};

export default Navbar;

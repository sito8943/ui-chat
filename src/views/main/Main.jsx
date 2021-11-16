import React, { useState, useEffect } from "react";

import { useContext } from "../../context/ContextProvider";
import {
  ChatIcon,
  BackspaceIcon,
  LaughingEmojIcon,
  DizzyEmojiIcon,
  ExpressionlessEmojiIcon,
  AngryEmojiIcon,
  FrownEmojiIcon,
  NeutralEmojiIcon,
  HearEyesEmojiIcon,
  SmileEmojiIcon,
  SmileUpsideDownEmojiIcon,
  SunglassesEmojiIcon,
  WinkEmojiIcon,
} from "../../icons/icons";

const emojis = [
  "laughing",
  "angry",
  "dizzy",
  "expression",
  "frown",
  "heareyes",
  "neutral",
  "smile",
  "smileupside",
  "sunglasses",
];

const Main = (props) => {
  const { contextState, setContextState } = useContext();
  const [search, setSearch] = useState("");
  const [emoji, setEmoji] = useState("laughing");
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    switch (e.target.id) {
      case "search":
        return setSearch(e.target.value);

      default:
        if (e.target.value != "") {
          document
            .getElementById("backspace")
            .classList.remove("icon-no-hover");
          document.getElementById("backspace").classList.add("icon-hover");

          document.getElementById("send").classList.remove("icon-no-hover");
          document.getElementById("send").classList.add("icon-hover");
        } else {
          document.getElementById("backspace").classList.remove("icon-hover");
          document.getElementById("backspace").classList.add("icon-no-hover");

          document.getElementById("send").classList.remove("icon-hover");
          document.getElementById("send").classList.add("icon-no-hover");
        }
        return setMessage(e.target.value);
    }
  };

  const changeEmoji = () => {
    const an = Math.random() * (emojis.length - 0) + 0;
    setEmoji(emojis[Math.floor(an)]);
  };

  const showEmoji = () => {
    switch (emoji) {
      case "laughing":
        return <LaughingEmojIcon />;
      case "angry":
        return <AngryEmojiIcon />;
      case "dizzy":
        return <DizzyEmojiIcon />;
      case "expression":
        return <ExpressionlessEmojiIcon />;
      case "frown":
        return <FrownEmojiIcon />;
      case "heareyes":
        return <HearEyesEmojiIcon />;
      case "neutral":
        return <NeutralEmojiIcon />;
      case "smile":
        return <SmileEmojiIcon />;
      case "smileupside":
        return <SmileUpsideDownEmojiIcon />;
      case "sunglasses":
        return <SunglassesEmojiIcon />;
      default:
        return <WinkEmojiIcon />;
    }
  };

  return (
    <div classNameName="main" style={{ height: "100vh" }}>
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
      <div
        className="uk-grid-collapse uk-text-center uk-height-expand"
        data-uk-grid
      >
        <div className="uk-width-medium uk-visible@m">
          <div className="uk-background-muted uk-padding">Item</div>
        </div>
        <div className="uk-width-expand@m  uk-width-1-1@s">
          <div className="uk-padding">
            <div className="uk-height-expand"></div>
            <form className="uk-height-small">
              <div
                style={{ border: "1px solid #e5e5e5", alignItems: "center" }}
                className="uk-width-1-1 uk-flex"
              >
                <input
                  id="message"
                  className="uk-input"
                  value={message}
                  onChange={handleInput}
                  type="text"
                  style={{ border: "none" }}
                />
                <a
                  id="backspace"
                  className="chat-icon icon icon-no-hover"
                  href="#"
                  disabled
                >
                  <BackspaceIcon />
                </a>
                <a
                  onMouseEnter={changeEmoji}
                  onMouseLeave={changeEmoji}
                  className="chat-icon icon"
                  href="#"
                  disabled
                >
                  {showEmoji()}
                </a>
                <a
                  id="send"
                  className="chat-icon icon icon-no-hover"
                  href="#"
                  disabled
                >
                  <ChatIcon />
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

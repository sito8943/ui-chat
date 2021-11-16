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

import NavBar from "../../components/navbar/NavBar";

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
  const [emoji, setEmoji] = useState("laughing");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  let pressTimer = undefined;

  const init = async () => {};

  useEffect(() => {
    init();
  }, []);

  const handleInput = (e) => {
    switch (e.target.id) {
      default:
        if (e.target.value != "") addHover();
        else removeHover();
        return setMessage(e.target.value);
    }
  };

  const addHover = () => {
    document.getElementById("backspace").classList.remove("icon-no-hover");
    document.getElementById("backspace").classList.add("icon-hover");

    document.getElementById("send").classList.remove("icon-no-hover");
    document.getElementById("send").classList.add("icon-hover");
  };

  const removeHover = () => {
    document.getElementById("backspace").classList.remove("icon-hover");
    document.getElementById("backspace").classList.add("icon-no-hover");

    document.getElementById("send").classList.remove("icon-hover");
    document.getElementById("send").classList.add("icon-no-hover");
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

  const deleteLast = () => {
    if (message != "") {
      setMessage(message.substr(0, message.length - 1));
      if (pressTimer == undefined) {
        pressTimer = window.setTimeout(function () {
          setMessage("");
        }, 2500);
      }
    } else {
      removeHover();
    }
  };
  const resetDelete = () => {
    if (pressTimer != undefined) {
      clearTimeout(pressTimer);
      pressTimer = undefined;
    }
    document.getElementById("message").focus();
    if (message == "") removeHover();
  };

  const send = () => {};

  return (
    <div classNameName="main" style={{ height: "100vh" }}>
      <NavBar texts={props.texts.NavBar} />
      <div
        className="uk-grid-collapse uk-text-center uk-section"
        data-uk-height-viewport="offset-top: true; offset-bottom: true"
        data-uk-grid
      >
        <div className="uk-width-medium uk-visible@m uk-background-muted">
          <div className="uk-padding">{chats.map((d, i) => {})}</div>
        </div>
        <div className="uk-width-expand@m uk-width-1-1@s">
          <div>
            <div
              className="uk-section"
              data-uk-height-viewport="offset-top: true; offset-bottom: true"
            >
              {messages.map((d, i) => {})}
            </div>
            <form className="uk-width-1-1">
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
                  onMouseDown={deleteLast}
                  onMouseUp={resetDelete}
                >
                  <BackspaceIcon />
                </a>
                <a
                  onMouseEnter={changeEmoji}
                  onMouseLeave={changeEmoji}
                  className="chat-icon icon"
                  href="#"
                >
                  {showEmoji()}
                </a>
                <a
                  id="send"
                  className="chat-icon icon icon-no-hover"
                  href="#"
                  onClick={send}
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

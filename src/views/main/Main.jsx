import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  XIcon,
  NotSentIcon,
  SentIcon,
  CorrectIcon,
} from "../../icons/icons";

import ChatMessage, { MessageStates } from "../../models/ChatMessage";
import ChatItemPlaceholder from "../../components/chatItem/ChatItemPlaceholder";
import ChatItem from "../../components/chatItem/ChatItem";
import User from "../../models/User";
import { sendMessage } from "../../services/post";

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
  const [otherUsers, setOtherUsers] = useState([
    new User("Laura", "offline", "/logo192.png", "/laura"),
  ]);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  let pressTimer = undefined;

  const init = async () => {};

  const checkForMessages = async () => {
    setTimeout(() => {
      for (let i = 0; i < messages.length; ++i)
        if (messages[i].State === MessageStates.not_sent)
          for (let j = 0; j < otherUsers.length; ++j) {
            const result = sendMessage(messages[i], otherUsers[j]);
            if (result === 200) updateMessageState(i, MessageStates.sent);
            else updateMessageState(i, MessageStates.error);
          }
    }, 200);
  };

  useEffect(() => {
    init();
    checkForMessages();
  }, [messages]);

  /**
   *
   * @param {string} name
   */
  const lookUserByName = (name) => {
    const result = otherUsers.filter((item) => {
      if (item.Name === name) return item;
    });
    if (result.length > 0) return result[0];
    return null;
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      default:
        if (e.target.value !== "") addHover();
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

  const retry = (e) => {
    const newMessages = [...messages];
    newMessages[e.target.id].State = MessageStates.not_sent;
    setMessages(newMessages);
  };

  /**
   *
   * @param {string} state
   * @param {number} index
   */
  const showStateIcon = (state, index) => {
    switch (state) {
      case MessageStates.not_sent:
        return <NotSentIcon />;
      case MessageStates.sent:
        return <SentIcon />;
      case MessageStates.received:
        return <CorrectIcon />;
      case MessageStates.seen:
        break;
      // error
      default:
        return (
          <span
            className="error-icon"
            onClick={retry}
            id={index}
            uk-tooltip={props.texts.Tooltips.NotConnected}
          >
            x
          </span>
        );
    }
  };

  const deleteLast = () => {
    if (message !== "") {
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
    if (pressTimer !== undefined) {
      clearTimeout(pressTimer);
      pressTimer = undefined;
    }
    document.getElementById("message").focus();
    if (message !== "") removeHover();
  };

  const sendReply = async (e) => {
    e.preventDefault();
    const newMessage = new ChatMessage(contextState.user.Name, message);
    setMessage("");
    setMessages([...messages, newMessage]);
  };

  const updateMessageState = (index, newState) => {
    const newMessages = [...messages];
    newMessages[index].State = newState;
    setMessages(newMessages);
  };

  return (
    <div className="main">
      <div
        className="uk-grid-collapse uk-text-center uk-section"
        data-uk-height-viewport="offset-top: true; offset-bottom: true"
        style={{ padding: "0" }}
        data-uk-grid
      >
        <div
          style={{ padding: "0" }}
          className="uk-width-medium uk-visible@m uk-background-muted uk-section chat-list"
        >
          <div>
            {chats.map((d, i) => {
              return (
                <div className="uk-animation-fade">
                  <hr style={{ margin: "auto", width: "90%" }} />
                  <ChatItemPlaceholder key={i} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="uk-width-expand@m uk-width-1-1@s">
          <div>
            <div
              className="uk-section"
              data-uk-height-viewport="offset-top: true; offset-bottom: true"
            >
              {messages.map((d, i) => {
                return (
                  <div key={i} style={{ padding: "10px" }}>
                    {d.Sender !== contextState.user.name ? (
                      <div style={{ textAlign: "left" }}>
                        <Link to={lookUserByName(d.Sender).link}>
                          <img
                            className="profile-img chat-photo small"
                            src={lookUserByName(d.Sender).photo}
                            alt={lookUserByName(d.Sender).name + "-photo"}
                          />
                        </Link>
                        <label
                          htmlFor=""
                          style={{ backgroundColor: "darkslategrey" }}
                          className="otherMessage"
                        >
                          {d.Message}
                        </label>
                      </div>
                    ) : (
                      <div style={{ textAlign: "right", paddingRight: "20px" }}>
                        <label
                          htmlFor=""
                          style={{
                            backgroundColor: "dodgerblue",
                            marginRight: "5px",
                          }}
                          className="otherMessage"
                        >
                          {d.message}
                        </label>
                        {showStateIcon(d.State, i)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <form
              onSubmit={sendReply}
              className="uk-expand"
              style={{ padding: "10px" }}
            >
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
                  placeholder={props.texts.Placeholders.Message}
                  autoComplete="off"
                  autoFocus
                  style={{ border: "none", height: "50px" }}
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
                <button
                  type="submit"
                  id="send"
                  className="chat-icon icon icon-no-hover"
                  href="#"
                  style={{ border: "none", background: "none", padding: "0" }}
                >
                  <ChatIcon />
                </button>
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

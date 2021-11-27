import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base64encode } from "nodejs-base64";

import { useContext } from "../../context/ContextProvider";
import { useChatContext } from "../../context/ChatContext";
import { sendMessage } from "../../services/post";
import { colors } from "../../utils/colors";

import {
  ChatIcon,
  BackspaceIcon,
  LaughingEmojIcon,
  DizzyEmojiIcon,
  ExpressionlessEmojiIcon,
  AngryEmojiIcon,
  FrownEmojiIcon,
  NeutralEmojiIcon,
  HeartEyesEmojiIcon,
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
import EmojiPanel, { Emojis } from "../../components/emojiPanel/EmojiPanel";
import SideBar from "../../components/theme/sideBar/SideBar";
import Divider from "../../components/theme/divider/Divider";

const emojis = [
  Emojis.Laughing,
  Emojis.Angry,
  Emojis.Dizzy,
  Emojis.Expression,
  Emojis.Frown,
  Emojis.Hearteyes,
  Emojis.Neutral,
  Emojis.Smile,
  Emojis.Smileupside,
  Emojis.Sunglasses,
];

const Main = (props) => {
  const { contextState, setContextState } = useContext();
  const { chatContextState, setChatContextState } = useContext();
  const [showEmojis, setShowEmojis] = useState(false);
  const [emoji, setEmoji] = useState(Emojis.Laughing);
  const [message, setMessage] = useState("");
  const [otherUsers, setOtherUsers] = useState([
    new User(
      base64encode("Laura"),
      "Laura",
      "offline",
      "/logo192.png",
      "/laura"
    ),
  ]);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  let pressTimer = undefined;

  const init = async () => {};

  const checkForMessages = async () => {
    setTimeout(() => {
      for (let i = 0; i < messages.length; ++i)
        if (messages[i].State === MessageStates.NotSent)
          for (let j = 0; j < otherUsers.length; ++j) {
            const result = sendMessage(messages[i], otherUsers[j]);
            if (result === 200) updateMessageState(i, MessageStates.Sent);
            else updateMessageState(i, MessageStates.Error);
          }
    }, 200);
  };

  useEffect(() => {
    init();
    checkForMessages();
    console.log("init");
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
        setMessage(e.target.value);
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
      case Emojis.Laughing:
        return <LaughingEmojIcon />;
      case Emojis.Angry:
        return <AngryEmojiIcon />;
      case Emojis.Dizzy:
        return <DizzyEmojiIcon />;
      case Emojis.Expression:
        return <ExpressionlessEmojiIcon />;
      case Emojis.Frown:
        return <FrownEmojiIcon />;
      case Emojis.Hearteyes:
        return <HeartEyesEmojiIcon />;
      case Emojis.Neutral:
        return <NeutralEmojiIcon />;
      case Emojis.Smile:
        return <SmileEmojiIcon />;
      case Emojis.Smileupside:
        return <SmileUpsideDownEmojiIcon />;
      case Emojis.Sunglasses:
        return <SunglassesEmojiIcon />;
      default:
        return <WinkEmojiIcon />;
    }
  };

  const emojiPanel = (e) => {
    e.preventDefault();
    setShowEmojis(!showEmojis);
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
      case MessageStates.NotSent:
        return <NotSentIcon />;
      case MessageStates.Sent:
        return <SentIcon />;
      case MessageStates.Received:
        return <CorrectIcon />;
      case MessageStates.Seen:
        break;
      // error
      default:
        return (
          <button
            className="error-icon"
            onClick={retry}
            id={index}
            uk-tooltip={props.texts.Tooltips.NotConnected}
          >
            x
          </button>
        );
    }
  };

  const deleteLast = (e) => {
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

  const resetDelete = (e) => {
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

  const mainFocus = (e) => {
    document.getElementById("main-control").style.border =
      "1px solid dodgerblue";
  };

  const lostFocus = (e) => {
    document.getElementById("main-control").style.border = `1px solid ${
      contextState.mode === "light"
        ? colors.LightInputBorderColor
        : colors.DarkInputBorderColor
    }`;
  };

  return (
    <div className="main">
      <div
        className="uk-grid-collapse uk-text-center uk-section"
        data-uk-height-viewport="offset-top: true; offset-bottom: true"
        style={{ padding: "0" }}
        data-uk-grid
      >
        <SideBar side="left">
          <div>
            {chats.map((d, i) => {
              return (
                <div className="uk-animation-fade">
                  {i !== 0 ? <Divider /> : <></>}

                  <ChatItemPlaceholder
                    key={i}
                    color={
                      contextState.mode === "light"
                        ? colors.LightMainBackground
                        : colors.DarkMainBackground
                    }
                    background={
                      contextState.mode === "light"
                        ? colors.LightPlaceholder
                        : colors.DarkPlaceholder
                    }
                  />
                </div>
              );
            })}
          </div>
        </SideBar>
        <div className="uk-width-expand">
          <div>
            <div
              className="uk-section message-list"
              data-uk-height-viewport="offset-top: true; offset-bottom: true"
            >
              {messages.map((d, i) => {
                return (
                  <div key={i} style={{ padding: "10px" }}>
                    {d.Sender !== contextState.user.name ? (
                      <div style={{ textAlign: "left" }}>
                        <Link to={lookUserByName(d.Sender).Link}>
                          <img
                            className="profile-img chat-photo small"
                            src={lookUserByName(d.Sender).Photo}
                            alt={lookUserByName(d.Sender).Id + "-photo"}
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
              {showEmojis ? (
                <EmojiPanel
                  background={
                    contextState.mode === "light"
                      ? colors.LightBarBackground
                      : colors.DarkBarBackground
                  }
                  color={
                    contextState.mode === "light"
                      ? colors.LightShadows
                      : colors.DarkShadows
                  }
                />
              ) : (
                <></>
              )}

              <div
                style={{
                  border: `1px solid ${
                    contextState.mode === "light"
                      ? colors.LightInputBorderColor
                      : colors.DarkInputBorderColor
                  }`,
                  alignItems: "center",
                }}
                className="uk-width-1-1 uk-flex"
                id="main-control"
              >
                <input
                  id="message"
                  className="uk-input div-input"
                  value={message}
                  onChange={handleInput}
                  type="text"
                  placeholder={props.texts.Placeholders.Message}
                  autoComplete="off"
                  onFocus={mainFocus}
                  onBlur={lostFocus}
                  autoFocus
                  style={{
                    border: "none",
                    height: "50px",
                    color:
                      contextState.mode === "light"
                        ? colors.LightFontColors
                        : colors.DarkFontColors,
                  }}
                />
                <button
                  type="button"
                  id="backspace"
                  className="chat-icon icon icon-no-hover"
                  onMouseDown={deleteLast}
                  onMouseUp={resetDelete}
                >
                  <BackspaceIcon />
                </button>
                <button
                  type="button"
                  onMouseEnter={changeEmoji}
                  onMouseLeave={changeEmoji}
                  onClick={emojiPanel}
                  className="chat-icon icon icon-hover"
                >
                  {showEmoji()}
                </button>
                <button
                  type="submit"
                  id="send"
                  className="chat-icon icon icon-no-hover"
                >
                  <ChatIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
        <SideBar side="right">
          <>
            {otherUsers.length == 1 ? (
              <div style={{ marginTop: "10px" }}>
                <Link to={otherUsers[0].Link}>
                  <img
                    style={{ margin: 0 }}
                    className="profile-img chat-photo large"
                    src={otherUsers[0].Photo}
                    alt={otherUsers[0].Name + "-photo"}
                  />
                </Link>
                <h3
                  style={{
                    margin: "0",
                    color:
                      contextState.mode === "light"
                        ? colors.LightFontColors
                        : colors.DarkFontColors,
                  }}
                >
                  {otherUsers[0].Name}
                </h3>
              </div>
            ) : (
              <></>
            )}
          </>
        </SideBar>
      </div>
    </div>
  );
};

export default Main;

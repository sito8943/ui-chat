import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base64encode } from "nodejs-base64";

import { useContext } from "../../context/ContextProvider";
import { useChatContext } from "../../context/ChatContext";
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
import { sendMessage } from "../../services/post";
import EmojiPanel, { Emojis } from "../../components/emojiPanel/EmojiPanel";

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
  const { chatContextState, setChatContextState } = useChatContext();
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
        return setChatContextState({
          type: "modifyText",
          newMessage: e.target.value,
        });
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
          className="uk-width-medium uk-visible@s uk-background-muted uk-section chat-list"
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
                {showEmojis ? <EmojiPanel /> : <></>}

                <div
                  style={{ border: "1px solid #e5e5e5", alignItems: "center" }}
                  className="uk-width-1-1 uk-flex"
                >
                  <input
                    id="message"
                    className="uk-input"
                    value={useChatContext}
                    onChange={handleInput}
                    type="text"
                    placeholder={props.texts.Placeholders.Message}
                    autoComplete="off"
                    autoFocus
                    style={{ border: "none", height: "50px" }}
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
        <div
          style={{ padding: "0" }}
          className="uk-width-medium uk-visible@m uk-background-muted uk-section right-bar"
        >
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
                <h3 style={{ margin: "0" }}>{otherUsers[0].Name}</h3>
              </div>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Main;

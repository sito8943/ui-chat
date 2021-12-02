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
import MainInput from "../../components/theme/form/MainInput";
import { Header3 } from "../../components/theme/headers/Headers";
import Message from "../../components/message/Message";
import { compareDates, LookUserByName } from "../../utils/functions";
import TextDivider from "../../components/theme/divider/TextDivider";

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
  const dateNow = new Date();
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
    document.getElementById("message").focus();
  }, [messages]);

  const handleInput = (e) => {
    switch (e.target.id) {
      default:
        if (e.target.value !== "") addHover();
        else removeHover();
        setMessage(e.target.value);
        break;
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
    setContextState({ type: "toggleEmojiPanel" });
  };

  const selectEmoji = (e) => {
    let newMessage = message;
    const position = document.getElementById("message").selectionStart;
    newMessage =
      newMessage.substr(0, position) +
      e.target.innerText +
      newMessage.substr(position);
    setMessage(newMessage);
    document.getElementById("message").focus();
  };

  const retry = (e) => {
    const newMessages = [...messages];
    newMessages[e.target.id].State = MessageStates.not_sent;
    setMessages(newMessages);
    if (contextState.showEmojis) setContextState({ type: "toggleEmojiPanel" });
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
    if (message.length > 0) {
      const newMessage = new ChatMessage(
        contextState.user.Name,
        message,
        new Date()
      );
      setMessage("");
      setMessages([...messages, newMessage]);
    }
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

  /**
   * @param {object} message
   * @param {number} index
   */
  const printMessage = (message, index) => {
    return (
      <>
        {!compareDates(dateNow, message.date) ? (
          <TextDivider date={message.date} />
        ) : (
          <></>
        )}

        <Message
          key={index}
          index={index}
          sender={LookUserByName(message.sender, otherUsers)}
          message={message}
          onClick={retry}
          texts={props.texts}
        />
      </>
    );
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
                  <ChatItemPlaceholder key={i} />
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
                return printMessage(d, i);
              })}
            </div>
            <form
              onSubmit={sendReply}
              className="uk-expand"
              style={{ padding: "10px" }}
            >
              {contextState.showEmojis ? (
                <EmojiPanel onClick={selectEmoji} />
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
                  className="uk-input div-input"
                  style={{
                    border: "none",
                    height: "50px",
                    color:
                      contextState.mode === "light"
                        ? colors.LightFontColors
                        : colors.DarkFontColors,
                  }}
                  id="message"
                  value={message}
                  onChange={handleInput}
                  type="text"
                  placeholder={props.texts.Placeholders.Message}
                  autoComplete="off"
                  onFocus={mainFocus}
                  onBlur={lostFocus}
                  autoFocus
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
                <Header3 margin="0" title={otherUsers[0].Name} />
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

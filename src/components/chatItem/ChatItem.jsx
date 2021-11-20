import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { IdleIcon, DotIcon, DontDisturbIcon } from "../../icons/icons";

const ChatItem = (props) => {
  const printStateIcon = () => {
    switch (props.data.state) {
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

  return (
    <div
      style={{ background: "#fff", padding: "20px" }}
      className="uk-flex-middle uk-flex"
    >
      <Link to={props.data.link}>
        <img
          className="profile-img chat-photo"
          src={props.data.photo}
          alt={props.data.name + "-photo"}
        />
      </Link>
      <div className="chat-description">
        <span>{props.data.name}</span>
        <button className="user-state-button">
          {printStateIcon()}
          <span>{props.data.state}</span>
        </button>
      </div>
    </div>
  );
};

export default ChatItem;

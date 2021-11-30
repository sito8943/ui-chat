import React from "react";

import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import { ShowStateIcon } from "../statesPanel/StatePanel";

const Message = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <div style={{ padding: "10px" }}>
      {props.message.Sender !== contextState.user.name ? (
        <div style={{ textAlign: "left" }}>
          <Link to={props.sender.Link}>
            <img
              className="profile-img chat-photo small"
              src={props.sender.Photo}
              alt={props.sender.Id + "-photo"}
            />
          </Link>
          <label
            htmlFor=""
            style={{ backgroundColor: "darkslategrey" }}
            className="otherMessage"
          >
            {props.message.Message}
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
            {props.message.message}
          </label>
          {ShowStateIcon(
            props.message.State,
            props.key,
            props.texts,
            props.onClick
          )}
        </div>
      )}
    </div>
  );
};

export default Message;

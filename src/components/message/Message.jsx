import React from "react";

import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import { ShowStateIcon } from "../statesPanel/StatePanel";

const Message = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={
          props.message.Sender !== contextState.user.name
            ? {
                textAlign: "left",
              }
            : {
                textAlign: "right",
                paddingRight: "20px",
              }
        }
      >
        {props.message.Sender !== contextState.user.name ? (
          <Link to={props.sender.Link}>
            <img
              className="profile-img chat-photo small"
              src={props.sender.Photo}
              alt={props.sender.Id + "-photo"}
            />
          </Link>
        ) : (
          <></>
        )}
        <label
          htmlFor=""
          style={
            props.message.Sender !== contextState.user.name
              ? { backgroundColor: "darkslategrey" }
              : {
                  backgroundColor: "dodgerblue",
                  marginRight: "5px",
                }
          }
          className="otherMessage"
        >
          {props.message.Message}
        </label>
        {props.message.Sender !== contextState.user.name ? (
          <></>
        ) : (
          <>
            {ShowStateIcon(
              props.message.State,
              props.index,
              props.texts,
              props.onClick
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Message;

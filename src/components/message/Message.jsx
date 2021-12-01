import React, { useState } from "react";

import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import { ShowStateIcon } from "../statesPanel/StatePanel";

import "./style.css";

const Message = (props) => {
  const { contextState, setContextState } = useContext();
  const [dateOpacity, setDateOpacity] = useState("0");
  const [dateDisplay, setDateDisplay] = useState("none");

  const showCurrentState = (e) => {
    if (dateDisplay === "none") {
      setDateDisplay("inherit");
      setTimeout(() => {
        setDateOpacity("1");
      }, 1);
    } else {
      setDateOpacity("0");
      setTimeout(() => {
        setDateDisplay("none");
      }, 200);
    }
  };

  const showSentDate = () => {
    let date = "";
    const now = new Date();
    date += now.getHours() + " : " + now.getMinutes();
    if (now.getDate() !== props.message.date.getDate())
      date += "/" + props.message.date.getDate();
    if (now.getMonth() !== props.message.date.getMonth())
      date += "/" + props.message.date.getMonth();
    if (now.getFullYear() !== props.message.date.getFullYear())
      date += "/" + props.message.date.getFullYear();

    return date;
  };

  return (
    <div style={{ padding: "10px" }}>
      <div
        className="message-row"
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
        <div className="message-column">
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
            onClick={showCurrentState}
          >
            {props.message.Message}
          </label>
          <label
            htmlFor=""
            className="date-label"
            style={{
              opacity: dateOpacity,
              display: dateDisplay,
            }}
            id={"d" + props.index}
          >
            {showSentDate()}
          </label>
        </div>

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

import React from "react";

import "./style.scss";

const Message = (props) => {
  return (
    <div
      className={`uk-alert ${
        props.type === "error" ? "uk-alert-danger" : "uk-alert-success"
      }`}
      data-uk-alert
    >
      <p>{props.label}</p>
    </div>
  );
};

export default Message;

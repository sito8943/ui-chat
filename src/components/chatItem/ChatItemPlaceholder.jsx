import React from "react";

import "./style.css";

const ChatItemPlaceholder = (props) => {
  return (
    <div className="container loading">
      <div className="img-container">
        <div
          className="img"
          style={{ backgroundColor: props.background }}
        ></div>
      </div>
      <div className="content">
        <div
          className="stripe small-stripe"
          style={{
            backgroundColor: props.background,
            border: `border: 1px solid ${props.color}`,
          }}
        ></div>
        <div
          className="stripe medium-stripe"
          style={{
            backgroundColor: props.background,
            border: `border: 1px solid ${props.color}`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ChatItemPlaceholder;

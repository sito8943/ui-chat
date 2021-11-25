import React from "react";

import './style.css'

const ChatItemPlaceholder = (props) => {

  return (
    <div className="container loading">
      <div className="img-container">
        <div className="img"></div>
      </div>
      <div className="content">
        <div className="stripe small-stripe"></div>
        <div className="stripe medium-stripe"></div>
      </div>
    </div>
  );
};

export default ChatItemPlaceholder;

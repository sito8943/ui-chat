import React from "react";

import './style.css'

const ChatItemPlaceholder = (props) => {

  return (
    <div class="container loading">
      <div class="img-container">
        <div class="img"></div>
      </div>
      <div class="content">
        <div class="stripe small-stripe"></div>
        <div class="stripe medium-stripe"></div>
      </div>
    </div>
  );
};

export default ChatItemPlaceholder;

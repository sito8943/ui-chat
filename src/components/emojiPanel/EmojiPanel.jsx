import React, { useState } from "react";

import "./style.css";

export let Emojis = {
  Laughing: 1,
  Angry: 2,
  Dizzy: 3,
  Expression: 4,
  Frown: 5,
  Hearteyes: 6,
  Neutral: 7,
  Smile: 8,
  Smileupside: 9,
  Sunglasses: 10,
  Wink: 11,
};

const EmojiPanel = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(0);

  return <div className="emoji-panel uk-background-muted"></div>;
};

export default EmojiPanel;

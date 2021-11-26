import React, { useState } from "react";

import * as unicodeEmoji from "unicode-emoji";

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

const groupBy = "cateogory";
const omitWhere = {
  versionAbove: "12.0",
  category: ["flags"],
  version: ["0.6", "0.7"],
};

const EmojiPanel = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(0);

  return (
    <div className="emoji-panel uk-background-muted uk-text-center" data-uk-grid>
      {unicodeEmoji.getEmojis(omitWhere).map((d, i) => {
        return <button className="emoji-button">{d.emoji}</button>;
      })}
    </div>
  );
};

export default EmojiPanel;

import React, { useState, useEffect } from "react";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";

import * as unicodeEmoji from "unicode-emoji";
import Divider from "../theme/divider/Divider";

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

const groupBy = "category";
const omitWhere = {
  versionAbove: "11.0",
  category: ["flags"],
  version: ["0.6", "0.7"],
};

const EmojiPanel = (props) => {
  const { contextState, setContextState } = useContext();

  const [selectedEmoji, setSelectedEmoji] = useState(0);
  const [setOfEmojis, setSetOfEmojis] = useState([]);
  const [setOfCategories, setSetOfCategories] = useState([]);

  useEffect(() => {
    const allEmojis = unicodeEmoji.getEmojisGroupedBy(groupBy, omitWhere);
    const allCategories = Object.keys(allEmojis);
    const newSetOfEmojis = [];
    const newSetOfCategories = [];
    allCategories.forEach((item) => {
      const arrayOfEmojis = {
        key: item,
        emojis: allEmojis[item],
      };
      const category = {
        key: item,
        emoji: allEmojis[item][0],
      };
      newSetOfEmojis.push(arrayOfEmojis);
      newSetOfCategories.push(category);
    });
    setSetOfCategories(newSetOfCategories);
    setSetOfEmojis(newSetOfEmojis);
  }, []);

  return (
    <div
      className="emoji-panel"
      style={{
        backgroundColor:
          contextState.mode === "light"
            ? colors.LightBarBackground + "b7"
            : colors.DarkBarBackground + "b7",
        boxShadow: `2px 2px 2px 2px ${
          contextState.mode === "light"
            ? colors.LightShadows
            : colors.DarkShadows
        }`,
      }}
    >
      <ul
        className="uk-subnav uk-subnav-pill"
        data-uk-switcher="animation: uk-animation-slide-left-medium, uk-animation-slide-right-medium"
        style={{ marginBottom: "0" }}
      >
        {setOfCategories.map((d, i) => {
          return (
            <li style={{ paddingLeft: i == 0 ? "20px" : "0" }} key={i}>
              <a className="emoji-category" href="#">
                {d.emoji.emoji}
              </a>
            </li>
          );
        })}
      </ul>
      <Divider />
      <ul className="uk-switcher">
        {setOfEmojis.map((d, i) => {
          return (
            <li key={i}>
              <div className="uk-text-center" data-uk-grid>
                {d.emojis.map((e, j) => {
                  return (
                    <button type="button" key={j} className="emoji-button">
                      {e.emoji}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EmojiPanel;

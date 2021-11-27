import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../../components/loading/Loading";

import { useContext } from "../../context/ContextProvider";
import { connectionState } from "../../services/get";

import { colors } from "../../utils/colors";

const Forgot = (props) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const { contextState, setContextState } = useContext();

  const handleInput = (e) => {
    switch (e.target.id) {
      case "name":
        return setName(e.target.value);
    }
  };

  const send = async (e) => {
    e.preventDefault();
    setTimeout(async () => {
      setContextState({ type: "checking" });
      const netStatus = await connectionState();
      if (netStatus) {
        const user = {
          name: name,
        };
      } else setContextState({ type: "offline" });
    }, 300);
  };

  const init = () => {};

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div
      className="uk-animation-scale-down"
      data-uk-grid
      style={{ alignItems: "center", height: "100vh" }}
    >
      <div className="uk-width-expand"></div>
      <div
        className="uk-card uk-card-default uk-card-body"
        style={{ padding: " 50px 75px" }}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="uk-flex">
              <img
                src="/logo512.png"
                alt="app-logo"
                style={{ height: "120px", marginRight: "20px" }}
              />
              <h3
                className="uk-card-title"
                style={{
                  color:
                    contextState.mode === "light"
                      ? colors.LightFontColors
                      : colors.DarkFontColors,
                }}
              >
                {props.texts.Title}
              </h3>
            </div>
            <p
              style={{
                color:
                  contextState.mode === "light"
                    ? colors.LightFontColors
                    : colors.DarkFontColors,
              }}
            >
              {props.texts.Paragraph}
            </p>
            <form onSubmit={send}>
              <fieldset className="uk-fieldset">
                <legend className="uk-legend">{props.texts.Labels.User}</legend>
                <div className="uk-margin">
                  <input
                    id="name"
                    value={name}
                    onChange={handleInput}
                    className="uk-input"
                    type="text"
                    placeholder={props.texts.Placeholders.User}
                    required
                    style={{
                      border: `1px solid ${
                        contextState.mode === "light"
                          ? colors.LightInputBorderColor
                          : colors.DarkInputBorderColor
                      }`,
                      color:
                        contextState.mode === "light"
                          ? colors.LightFontColors
                          : colors.DarkFontColors,
                    }}
                  />
                </div>
              </fieldset>
              <div className="uk-button-group">
                <button className="uk-button uk-button-primary">
                  {props.texts.Buttons.Send}
                </button>
                <Link
                  className="uk-button uk-button-default return-button"
                  style={{
                    color:
                      contextState.mode === "light"
                        ? colors.LightFontColors
                        : colors.DarkFontColors,
                  }}
                  to="/"
                >
                  {props.texts.Buttons.Return}
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
      <div className="uk-width-expand"></div>
    </div>
  );
};

export default Forgot;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../../components/loading/Loading";

import { useContext } from "../../context/ContextProvider";
import { connectionState } from "../../services/get";
import { colors } from "../../utils/colors";

import { Paragraph } from "../../components/theme/ThemeComponents";
import { Header3 } from "../../components/theme/headers/Headers";
import { Label } from "../../components/theme/form/label/Label";
import Card from "../../components/theme/card/Card";

const Forgot = (props) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const { contextState, setContextState } = useContext();

  const handleInput = (e) => {
    switch (e.target.id) {
      default: //name
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
    <div className="uk-animation-scale-down main-view" data-uk-grid>
      <div className="uk-width-expand"></div>
      <Card>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="uk-flex">
              <img
                src="/logo512.png"
                alt="app-logo"
                className="app-main-logo"
              />
              <Header3 title={props.texts.Title} />
            </div>
            <Paragraph paragraph={props.texts.Paragraph} />
            <form onSubmit={send}>
              <fieldset className="uk-fieldset">
                <Label>{props.texts.Labels.User}</Label>
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
      </Card>
      <div className="uk-width-expand"></div>
    </div>
  );
};

export default Forgot;

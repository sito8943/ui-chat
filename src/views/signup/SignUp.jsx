import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../../components/loading/Loading";

import { useContext } from "../../context/ContextProvider";
import { connectionState } from "../../services/get";

import { colors } from "../../utils/colors";
import { LinkButton, Paragraph } from "../../components/theme/ThemeComponents";
import { Header3 } from "../../components/theme/headers/Headers";
import { Label } from "../../components/theme/form/Label";
import Card from "../../components/theme/card/Card";
import Divider from "../../components/theme/divider/Divider";

const SignUp = (props) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const { contextState, setContextState } = useContext();

  const init = () => {};

  const signUp = async (e) => {
    e.preventDefault();
    setTimeout(async () => {
      setContextState({ type: "checking" });
      const netStatus = await connectionState();
      if (netStatus) {
        const user = {
          name: name,
          email: email,
          password: password,
        };
      } else setContextState({ type: "offline" });
    }, 300);
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "name":
        return setName(e.target.value);
      case "email":
        return setEmail(e.target.value);
      case "password":
        return setPassword(e.target.value);
      case "passwordR":
        return setPasswordR(e.target.value);
      default:
        break;
    }
  };

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
            <form onSubmit={signUp}>
              <fieldset className="uk-fieldset">
                <Label text={props.texts.Labels.User} />
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
              <fieldset className="uk-fieldset">
                <Label text={props.texts.Labels.Email} />
                <div className="uk-margin">
                  <input
                    id="email"
                    value={email}
                    onChange={handleInput}
                    className="uk-input"
                    type="text"
                    placeholder={props.texts.Placeholders.Email}
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
              <fieldset className="uk-fieldset">
                <Label text={props.texts.Labels.Password} />
                <div className="uk-margin">
                  <input
                    id="password"
                    value={password}
                    onChange={handleInput}
                    className="uk-input"
                    type="password"
                    placeholder={props.texts.Placeholders.Password}
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
              <fieldset className="uk-fieldset">
                <Label text={props.texts.Labels.PasswordR} />
                <div className="uk-margin">
                  <input
                    id="passwordR"
                    value={passwordR}
                    onChange={handleInput}
                    className="uk-input"
                    type="password"
                    placeholder={props.texts.Placeholders.PasswordR}
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
                  {props.texts.Buttons.SignUp}
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
            <Divider />
          </>
        )}
      </Card>
      <div className="uk-width-expand"></div>
    </div>
  );
};

export default SignUp;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { base64encode } from "nodejs-base64";

import Loading from "../../components/loading/Loading";

import { useContext } from "../../context/ContextProvider";
import { login } from "../../services/post";
import User from "../../models/User";

import { colors } from "../../utils/colors";
import { Paragraph } from "../../components/theme/ThemeComponents";
import { Header3 } from "../../components/theme/headers/Headers";
import { Label } from "../../components/theme/form/label/Label";
import Card from "../../components/theme/card/Card";
import Divider from "../../components/theme/divider/Divider";
import Message from "../../components/theme/form/message/Message";

const Login = (props) => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { contextState, setContextState } = useContext();

  const init = () => {};

  const signIn = async (d) => {
    setLoading(true);
    const user = {
      n: d.name,
      p: d.password,
    };
    const data = await login(user);
    if (data !== "good") {
      if (data !== 200 && data[0] !== "E")
        setError(props.texts.Errors.WrongUser);
      else setError(props.texts.Errors.NotConnected);
    } else {
      const nUser = new User(base64encode(user.n), user.n);
      setContextState({
        type: "log-in",
        user: nUser,
      });
      if (d.remember === "false") localStorage.setItem("username", user.n);
      else sessionStorage.setItem("username", user.n);
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
    setLoading(false);
  }, []);

  return (
    <div className="uk-animation-scale-down main-view" data-uk-grid>
      <div className="uk-width-expand"></div>
      <Card>
        {loading ? <Loading type="backdrop" /> : <></>}
        <Header3 title={props.texts.Title} />
        <Paragraph paragraph={props.texts.Paragraph} />
        <form onSubmit={handleSubmit(signIn)}>
          <fieldset className="uk-fieldset">
            <Label>{props.texts.Labels.User}</Label>
            <div className="uk-margin">
              <input
                id="name"
                {...register("name")}
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
            <Label>{props.texts.Labels.Password}</Label>
            <div className="uk-margin">
              <input
                id="password"
                {...register("password")}
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
          <fieldset className="uk-fieldset uk-margin uk-grid-small uk-child-width-auto uk-grid">
            <label>
              <input
                id="remember"
                {...register("remember")}
                type="checkbox"
                style={{
                  marginRight: "10px",
                  color:
                    contextState.mode === "light"
                      ? colors.LightFontColors
                      : colors.DarkFontColors,
                }}
              />
              {props.texts.Labels.Remember}
            </label>
          </fieldset>
          {error !== "" ? <Message label={error} type="error" /> : <></>}
          <div className="uk-button-group">
            <button className="uk-button uk-button-primary">
              {props.texts.Buttons.SignIn}
            </button>
            <Link
              className="uk-button uk-button-default return-button"
              style={{
                color:
                  contextState.mode === "light"
                    ? colors.LightFontColors
                    : colors.DarkFontColors,
              }}
              to="/signup"
            >
              {props.texts.Buttons.SignUp}
            </Link>
          </div>
        </form>
        <Divider width="100%" margin="10px 0" />
        <div className="uk-button-group">
          <Link
            style={{
              color:
                contextState.mode === "light"
                  ? colors.LightFontColors
                  : colors.DarkFontColors,
            }}
            className="uk-link-muted"
            to="/forgot"
          >
            {props.texts.Buttons.Forgot}
          </Link>
        </div>
      </Card>
      <div className="uk-width-expand"></div>
    </div>
  );
};

export default Login;

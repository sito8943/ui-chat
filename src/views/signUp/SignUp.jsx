import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { base64encode } from "nodejs-base64";

import Loading from "../../components/loading/Loading";

import { useContext } from "../../context/ContextProvider";
import { register as registerUser } from "../../services/post";
import { GenerateRandomNumber } from "../../utils/functions";
import User from "../../models/User";

import { colors } from "../../utils/colors";
import { Header3 } from "../../components/theme/headers/Headers";
import { Label } from "../../components/theme/form/label/Label";
import Card from "../../components/theme/card/Card";
import Message from "../../components/theme/form/message/Message";

const SignUp = (props) => {
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { contextState, setContextState } = useContext();
  const [ran, setRan] = useState(0);

  const init = () => {};

  const signUp = async (d) => {
    setLoading(true);
    const user = {
      n: d.name,
      p: d.password,
    };
    if (d.phone !== "" && d.email !== "")
      if (d.password === d.rpassword) {
        const data = await registerUser(user);
        if (data !== "good") {
          if (data !== 200 && data[0] !== "E")
            setError(props.texts.Errors.UserNameTaken);
          else setError(props.texts.Errors.NotConnected);
        } else {
          const nUser = new User(base64encode(user.n), user.n);
          setContextState({
            type: "log-in",
            user: nUser,
          });
        }
      } else setError(props.texts.Errors.WrongPassword);
    else setError(props.texts.Errors.EmptyContacts);
    setLoading(false);
  };

  useEffect(() => {
    setRan(GenerateRandomNumber(0, props.texts.Placeholders.Users.length));
    init();
    setLoading(false);
  }, []);

  return (
    <div className="uk-animation-scale-down main-view" data-uk-grid>
      <div className="uk-width-expand"></div>
      <Card>
        {loading ? <Loading type="backdrop" /> : <></>}
        <Header3 title={props.texts.Title} />
        <form onSubmit={handleSubmit(signUp)}>
          <fieldset className="uk-fieldset">
            <Label>{props.texts.Labels.User}</Label>
            <div className="uk-margin">
              <input
                id="name"
                {...register("name")}
                className="uk-input"
                type="text"
                placeholder={props.texts.Placeholders.Users[ran]}
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
            <Label>{props.texts.Labels.Phone}</Label>
            <div className="uk-margin">
              <input
                id="phone"
                {...register("phone")}
                className="uk-input"
                type="phone"
                placeholder={props.texts.Placeholders.Phone}
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
            <Label>{props.texts.Labels.Email}</Label>
            <div className="uk-margin">
              <input
                id="email"
                {...register("email")}
                className="uk-input"
                type="email"
                placeholder={props.texts.Placeholders.Emails[ran]}
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
          <fieldset className="uk-fieldset">
            <Label>{props.texts.Labels.PasswordR}</Label>
            <div className="uk-margin">
              <input
                id="passwordR"
                {...register("rpassword")}
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
          {error !== "" ? <Message label={error} type="error" /> : <></>}
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
              to="/login"
            >
              {props.texts.Buttons.Return}
            </Link>
          </div>
        </form>
      </Card>
      <div className="uk-width-expand"></div>
    </div>
  );
};

export default SignUp;

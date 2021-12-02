import React from "react";

import { useContext } from "../../../context/ContextProvider";
import { colors } from "../../../utils/colors";

import Divider from "../divider/Divider";
import { Header5 } from "../headers/Headers";

import "./style.css";

const TextDivider = (props) => {
  const { contextState, setContextState } = useContext();
  return (
    <div className="row-text-divider">
      <Divider width={"40%"} />
      <Header5
        className='divider-text'
        title={
          props.date.getDate() +
          "/" +
          props.date.getMonth() +
          "/" +
          props.date.getFullYear()
        }
      />
      <Divider width={"40%"} />
    </div>
  );
};

export default TextDivider;

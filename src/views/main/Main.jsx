import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useContext } from "../../context/ContextProvider";
import { colors } from "../../utils/colors";
import { GenerateRandomNumber, GetRandomOf } from "../../utils/functions";

import Product from "../../models/Product";
import User from "../../models/User";

import ProductCard from "../../components/theme/productCard/ProductCard";
import SideBar from "../../components/theme/sideBar/SideBar";
import { Header3 } from "../../components/theme/headers/Headers";
import { Label } from "../../components/theme/form/label/Label";

const Main = (props) => {
  const { contextState, setContextState } = useContext();

  const init = async () => {};

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="main">
      <div
        className="uk-grid-collapse uk-text-center uk-section"
        data-uk-height-viewport="offset-top: true; offset-bottom: true"
        style={{ padding: "0" }}
        data-uk-grid
      >
        <SideBar side="left"></SideBar>
        <div className="uk-width-expand"></div>
      </div>
    </div>
  );
};

export default Main;

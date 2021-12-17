import Loader from "react-loader-spinner";
import React from "react";

import "./style.scss";

const Loading = (props) => {
  return (
    <div className={props.type ? props.type : ""}>
      <Loader
        type="Rings"
        color="dodgerblue"
        height={100}
        width={100}
        timeout={0}
      />
    </div>
  );
};

export default Loading;

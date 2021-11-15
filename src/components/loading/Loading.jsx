import Loader from "react-loader-spinner";
import React from "react"

const Loading = () => {
    return (
        <Loader
        type="Rings"
        color="dodgerblue"
        height={100}
        width={100}
        timeout={0}
      />
    )
}

export default Loading
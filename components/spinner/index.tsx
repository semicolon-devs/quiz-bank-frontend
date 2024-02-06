import React from "react";

import { SpinnerCircular } from "spinners-react";

interface SpinnerProps {
  size?: number;
  color?: "blue" | "white";
}

const Spinner = (props: SpinnerProps) => {
  const { size, color } = props;

  return (
    <SpinnerCircular
      size={size ? size : 50}
      thickness={180}
      speed={100}
      color="rgba(255, 255, 255, 1)"
      secondaryColor="rgba(0, 0, 0, 0)"
    />
  );
};

export default Spinner;

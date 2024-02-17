import React from "react";

import { SpinnerCircular } from "spinners-react";

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 50 }: SpinnerProps) {
  return (
    <SpinnerCircular
      size={size}
      thickness={180}
      speed={100}
      color="rgba(255, 255, 255, 1)"
      secondaryColor="rgba(0, 0, 0, 0)"
    />
  );
}

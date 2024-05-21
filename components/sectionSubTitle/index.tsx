import { Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
};

const SectionSubTitle = ({ title }: Props) => {
  return (
    <Typography
      variant="h6"
      textTransform={"capitalize"}
      gutterBottom
      // suppressHydrationWarning
    >
      {title}
    </Typography>
  );
};

export default SectionSubTitle;

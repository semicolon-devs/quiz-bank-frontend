import React from "react";

import Typography from "@mui/material/Typography";

type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props) => {
  return (
    <Typography
      variant="h4"
      textTransform={"capitalize"}
      gutterBottom
      // suppressHydrationWarning
    >
      {title}
    </Typography>
  );
};

export default SectionTitle;

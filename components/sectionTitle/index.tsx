import React from "react";

type Props = {
  title: string;
  noMarginBottom?: boolean;
};

const SectionTitle = ({ title, noMarginBottom = false }: Props) => {
  return (
    <h3
      className={`text-3xl text-blue-700 font-semibold ${
        !noMarginBottom && "mb-4"
      } capitalize`}
    >
      {title}
    </h3>
  );
};

export default SectionTitle;

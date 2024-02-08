import React from "react";

type Props = {
  title: string;
};

const SectionSubTitle = ({ title }: Props) => {
  return (
    <h4 className="text-xl text-blue-700 font-semibold mb-3 capitalize">
      {title}
    </h4>
  );
};

export default SectionSubTitle;

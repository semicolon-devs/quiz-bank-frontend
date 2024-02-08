import React from "react";

type Props = {
  title: string;
};

const SectionSubTitle = ({ title }: Props) => {
  return <h4 className="text-xl text-blue font-semibold mb-2">{title}</h4>;
};

export default SectionSubTitle;

import React from "react";

type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props) => {
  return <h3 className="text-3xl text-blue font-bold mb-4">{title}</h3>;
};

export default SectionTitle;

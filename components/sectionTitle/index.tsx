import React from "react";

type Props = {
  title: string;
};

const SectionTitle = ({ title }: Props) => {
  return <h3 className="text-3xl text-blue-700 font-semibold mb-4 capitalize">{title}</h3>;
};

export default SectionTitle;

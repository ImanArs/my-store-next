import React from "react";

interface Props {
  label: string;
  className?: string;
}

const backgroundColors = {
  even: "#D1E8E2",
  odd: "#F8D7DA",
};

export const ProductLabel = (props: Props) => {
  const { label } = props;
  const isEven = label.length % 2 === 0;
  const backgroundColor = isEven ? backgroundColors.even : backgroundColors.odd;

  return (
    <div style={{ backgroundColor, padding: "10px", borderRadius: "5px" }}>
      {label}
    </div>
  );
};

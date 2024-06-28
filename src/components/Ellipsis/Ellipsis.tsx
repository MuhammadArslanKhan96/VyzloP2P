import React from "react";

interface EllipsisProps {
  num?: string; // Make the num prop optional
}

const Ellipsis: React.FC<EllipsisProps> = ({ num = "" }) => {
  if (num.length < 14) {
    return <span>{num}</span>;
  }

  const firstPart = num.slice(0, 6);
  const lastPart = num.slice(-6);
  const displayedToken = `${firstPart}...${lastPart}`;

  return <span>{displayedToken}</span>;
};

export default Ellipsis;

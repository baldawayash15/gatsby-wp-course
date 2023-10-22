import { Link } from 'gatsby';
import React from 'react';

interface CtaBtnProps {
  label: string;
  destination: string;
  fullWidth?: boolean;
  isActive?: boolean;
}

export const CtaBtn: React.FC<CtaBtnProps> = ({
  label,
  destination,
  fullWidth,
  isActive,
}) => {
  return (
    <Link
      to={destination}
      className={`!text-black 
      ${fullWidth ? 'block' : 'inline-block'}
      ${isActive ? 'cursor-default bg-yellow-400' : ''} btn
      `}
    >
      {label}
    </Link>
  );
};

import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface TickItemProps {
  children: JSX.Element | JSX.Element[];
}

export const TickItem: React.FC<TickItemProps> = ({ children }) => {
  return (
    <div className="my-4 flex items-center">
      <div className="mr-4">
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-[30px] text-emerald-900"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};

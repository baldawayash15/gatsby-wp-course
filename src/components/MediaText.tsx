import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface MediaTextProps {
  key?: string | number;
  verticalAlignment: string;
  style: any;
  className: string;
  mediaPosition: string;
  gatsbyImage: IGatsbyImageData;
  children?: JSX.Element | JSX.Element[];
}

export const MediaText: React.FC<MediaTextProps> = ({
  verticalAlignment,
  style,
  className,
  mediaPosition,
  gatsbyImage,
  children,
}) => {
  const content = (
    <div
      className={`flex p-4 ${
        verticalAlignment === 'center' ? 'items-center' : ''
      }`}
    >
      <div>{children}</div>
    </div>
  );
  return (
    <div style={style} className={className}>
      {mediaPosition === 'right' && content}
      <div>
        <GatsbyImage alt={''} image={gatsbyImage} />
      </div>
      {mediaPosition !== 'right' && content}
    </div>
  );
};

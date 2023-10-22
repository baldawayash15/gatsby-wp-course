import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';

interface CoverProps {
  children: JSX.Element | JSX.Element[];
  style: any;
  className: any;
  gatsbyImage: IGatsbyImageData;
}

export const Cover: React.FC<CoverProps> = ({
  children,
  style,
  className,
  gatsbyImage,
}) => {
  return (
    <div style={style} className={`relative text-white ${className}`}>
      <div className="absolute h-full w-full">
        <GatsbyImage
          image={gatsbyImage}
          alt="TGG Cover"
          className="h-full w-full"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-black/50"></div>
      <div className="z-10 max-w-[var(--wp--style--global--wide-size)]">
        {children}
      </div>
    </div>
  );
};

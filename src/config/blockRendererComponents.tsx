import React from 'react';
import numeral from 'numeral';
import {
  BlockRenderer,
  getClasses,
  getStyles,
} from '@webdeveducation/wp-block-tools';
import { GatsbyImage } from 'gatsby-plugin-image';

import {
  MediaText,
  CtaBtn,
  Cover,
  TickItem,
  CarSearch,
  ContactForm7,
} from '../components';

const BlockRendererComponents: any = (block: any) => {
  switch (block.name) {
    case 'contact-form-7/contact-form-selector': {
      return (
        <ContactForm7
          key={block.id}
          formId={block.attributes.id}
          formMarkup={block.attributes.formMarkup
            .replace('novalidate="novalidate"', '')
            .split('aria-required="true"')
            .join('aria-required="true" required')}
        />
      );
    }

    case 'tgg/carsearch': {
      return (
        <CarSearch
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
        />
      );
    }

    case 'tgg/carprice': {
      console.log('CAR PRICE DATA: ', block);
      return (
        <div className="flex justify-center" key={block.id}>
          <div className="bg-black text-white text-3xl py-5 px-8 font-heading">
            £{numeral(block.attributes.price).format('0,0')}
          </div>
        </div>
      );
    }

    case 'tgg/tickitem': {
      return (
        <TickItem key={block.id}>
          <BlockRenderer blocks={block.innerBlocks} />
        </TickItem>
      );
    }

    case 'tgg/ctabutton': {
      console.log('CTA BUTTON BLOCK', block);
      const alignMap: any = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      };

      return (
        <div className={alignMap[block.attributes.data.align]} key={block.id}>
          <CtaBtn
            key={block.id}
            destination={block.attributes.data.destination}
            label={block.attributes.data.label}
          />
        </div>
      );
    }

    case 'core/image': {
      console.log('IMAGE BLOCK DATA: ', block);
      return (
        <figure key={block.id} className={getClasses(block)}>
          <GatsbyImage
            style={getStyles(block)}
            image={block.attributes.gatsbyImage}
            alt={block.attributes.alt || ''}
          />
        </figure>
      );
    }

    case 'core/cover': {
      console.log('COVER BLOCK DATA: ', block);
      return (
        <Cover
          key={block.id}
          style={getStyles(block)}
          className={getClasses(block)}
          gatsbyImage={block.attributes.gatsbyImage}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </Cover>
      );
    }

    case 'core/media-text':
      return (
        <MediaText
          key={block.id}
          className={getClasses(block)}
          style={getStyles(block)}
          verticalAlignment={block.attributes.verticalAlignment}
          gatsbyImage={block.attributes.gatsbyImage}
          mediaPosition={block.attributes.mediaPosition}
        >
          <BlockRenderer blocks={block.innerBlocks} />
        </MediaText>
      );

    default:
      return null;
  }
};

export default BlockRendererComponents;

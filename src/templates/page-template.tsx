import React from 'react';
import { HeadFC, Link } from 'gatsby';
import { BlockRendererProvider } from '@webdeveducation/wp-block-tools';
import { IBlockBase } from '@webdeveducation/wp-block-tools/dist/cjs/types';
import { graphql } from 'gatsby';

import BlockRendererComponents from '../config/blockRendererComponents';
import { Layout } from '../components';

interface PageProps {
  props: {
    pageContext: {
      blocks: IBlockBase;
      title?: string;
    };
  };
}

interface HeadingProps {
  wpPage: {
    seo: {
      title: string;
      metaDesc: string;
    };
  };

  wpCar: {
    seo: {
      title: string;
      metaDesc: string;
    };
  };
}

const PageTemplate: React.FC<PageProps> = (props: any) => {
  console.log('PAGE PROPS: ', props);
  return (
    <Layout>
      <BlockRendererProvider
        siteDomain={process.env.GATSBY_WP_URL}
        allBlocks={props.pageContext.blocks}
        renderComponent={BlockRendererComponents}
        customInternalLinkComponent={(
          { children, internalHref, className },
          index
        ) => {
          return (
            <Link key={index} to={internalHref} className={className}>
              {children}
            </Link>
          );
        }}
      />
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($databaseId: Int!) {
    wpPage(databaseId: { eq: $databaseId }) {
      seo {
        title
        metaDesc
      }
    }

    wpCar(databaseId: { eq: $databaseId }) {
      seo {
        title
        metaDesc
      }
    }
  }
`;

export const Head: HeadFC<HeadingProps> = ({ data }) => {
  const page = data.wpPage || data.wpCar;
  return (
    <>
      <title>{page.seo?.title || ''}</title>
      <meta name="description" content={page.seo?.metaDesc || ''} />
    </>
  );
};

export default PageTemplate;

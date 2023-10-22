import type { GatsbyNode } from 'gatsby';
import path from 'path';
import { assignIds, assignGatsbyImage } from '@webdeveducation/wp-block-tools';
import fs from 'fs';

interface PagesProps {
  data: {
    wp: {
      themeStylesheet: string | any;
    };

    allWpCar: {
      nodes: {
        databaseId: number;
        blocks: any;
        title: string;
        uri: string;
      }[];
    };

    allWpPage: {
      nodes: {
        databaseId: number;
        blocks: any;
        title: string;
        uri: string;
      }[];
    };
  };

  errors?: any;
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  try {
    const pageTemplate = path.resolve(`src/templates/page-template.tsx`);

    const { data }: PagesProps | any = await graphql(`
      query AllPagesQuery {
        wp {
          themeStylesheet
        }

        allWpCar {
          nodes {
            databaseId
            blocks
            title
            uri
          }
        }

        allWpPage {
          nodes {
            databaseId
            blocks
            title
            uri
          }
        }
      }
    `);

    fs.writeFileSync('./public/themeStylesheet.css', data?.wp?.themeStylesheet);

    const allPages = [...data.allWpPage.nodes, ...data.allWpCar.nodes];

    allPages.forEach(async (page) => {
      // const pageSlug = `/${slugify(page.uri, { lower: true, trim: true })}`;
      let blocks = page.blocks;
      blocks = assignIds(blocks);
      blocks = await assignGatsbyImage({
        blocks,
        graphql,
        coreMediaText: true,
        coreImage: true,
        coreCover: true,
      });

      createPage({
        path: page.uri,
        component: pageTemplate,
        context: {
          databaseId: page.databaseId,
          blocks,
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
};

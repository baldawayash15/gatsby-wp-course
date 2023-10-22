import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import { CtaBtn } from './index';

interface MenuProps {
  wp: {
    acfOptionsMainMenu: {
      mainMenu: {
        menuItems: {
          root: {
            label: string;
            destination: {
              uri: string;
            };
          };
          subMenuItems: {
            label: string;
            destination: {
              uri: string;
            };
          }[];
        }[];
      };
    };
  };
}

const Menu: React.FC<MenuProps> = () => {
  const data = useStaticQuery(query);
  const { menuItems } = data.wp.acfOptionsMainMenu.mainMenu;
  console.log('MAIN MENU DATA: ', data);
  return (
    <div className="bg-gradient-to-tr from-british-racing-green to-emerald-900 text-white px-4 font-bold sticky top-0 z-20 h-16 flex justify-between items-center">
      <Link to="/">
        <StaticImage
          src="../../static/icon.png"
          alt="logo"
          layout="fixed"
          height={30}
          placeholder="blurred"
        />
      </Link>
      <div className="flex h-full flex-1 justify-end">
        {(menuItems || []).map((menuItem: any, index: number) => {
          return (
            <div
              key={index}
              className="group flex h-full cursor-pointer hover:bg-emerald-800 relative"
            >
              <Link
                to={menuItem.root.destination.uri}
                className="px-4 flex h-full items-center text-white no-underline"
              >
                {menuItem.root.label}
              </Link>
              {!!menuItem.subMenuItems?.length && (
                <div className="group-hover:block hidden bg-emerald-800 text-right absolute top-full right-0">
                  {menuItem.subMenuItems.map(
                    (subMenuItem: any, index: number) => {
                      return (
                        <Link
                          to={subMenuItem.destination.uri}
                          key={index}
                          className="block whitespace-nowrap text-white p-4 no-underline hover:bg-emerald-700"
                        >
                          {subMenuItem.label}
                        </Link>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="pl-4">
        <CtaBtn
          label={data.wp.acfOptionsMainMenu.mainMenu.callToActionButton.label}
          destination={
            data.wp.acfOptionsMainMenu.mainMenu.callToActionButton.destination
              .uri
          }
        />
      </div>
    </div>
  );
};

export const query = graphql`
  query MainMenuQuery {
    wp {
      acfOptionsMainMenu {
        mainMenu {
          callToActionButton {
            destination {
              ... on WpPage {
                uri
              }
            }
            label
          }
          menuItems {
            root {
              destination {
                ... on WpPage {
                  uri
                }
              }
              label
            }
            subMenuItems {
              destination {
                ... on WpPage {
                  uri
                }
              }
              label
            }
          }
        }
      }
    }
  }
`;

export default Menu;

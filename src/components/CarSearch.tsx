import React, { FormEvent } from 'react';
import { useQuery, gql } from '@apollo/client';
import numeral from 'numeral';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { CtaBtn } from './CtaBtn';
import { PageNumber } from './PageNumber';
import { navigate } from 'gatsby';

interface CarSearchProps {
  style: any;
  className: any;
}

interface CarSearchDataProps {
  databaseId: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };

  title: string;
  uri: string;

  carDetails: {
    price: number;
  };
}

export const CarSearch: React.FC<CarSearchProps> = ({ style, className }) => {
  const pageSize = 3;
  let page = 1;
  let defaultMinPrice: string | null = '';
  let defaultMaxPrice: string | null = '';
  let defaultColor: string | null = '';

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    page = parseInt(params.get('page') || '1');
    defaultMinPrice = params.get('minPrice');
    defaultMaxPrice = params.get('maxPrice');
    defaultColor = params.get('color');
  }

  let metaQuery = '{}';
  if (defaultColor || defaultMaxPrice || defaultMinPrice) {
    let colorQuery = '';
    let minPriceQuery = '';
    let maxPriceQuery = '';

    if (defaultColor) {
      colorQuery = `{key: "color", compare: EQUAL_TO, value: "${defaultColor}"},`;
    }

    if (defaultMinPrice) {
      minPriceQuery = `{key: "price", compare: GREATER_THAN_OR_EQUAL_TO, type: NUMERIC, value: "${defaultMinPrice}"},`;
    }

    if (defaultMaxPrice) {
      maxPriceQuery = `{key: "price", compare: LESS_THAN_OR_EQUAL_TO, type: NUMERIC, value: "${defaultMaxPrice}"},`;
    }

    metaQuery = `{
      relation: AND
      metaArray: [${colorQuery}${minPriceQuery}${maxPriceQuery}]
    }`;
  }

  const { loading, error, data } = useQuery(
    gql`
      query AllCarsQuery($size: Int!, $offset: Int!) {
        allCar(where: { metaQuery: ${metaQuery} offsetPagination: { offset: $offset, size: $size } }) {
          nodes {
            databaseId
            featuredImage {
              node {
                sourceUrl(size: LARGE)
              }
            }
            carDetails {
              price
            }
            title
            uri
          }
          pageInfo {
            offsetPagination {
              total
            }
          }
        }
      }
    `,
    {
      variables: {
        size: pageSize,
        offset: pageSize * (page - 1),
      },
    }
  );

  const totalResults = data?.allCar?.pageInfo?.offsetPagination?.total || 0;
  const totalPages = Math.ceil(totalResults / pageSize);

  console.log('CARS DATA: ', data, loading, error);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData: any = new FormData(event.target);
    const params = new URLSearchParams(formData);
    params.set('page', '1');
    navigate(`${window.location.pathname}?${params.toString()}`);
  };
  return (
    <div style={style} className={className}>
      <fieldset>
        <form
          onSubmit={handleSubmit}
          className="bg-stone-200 mb-4 py-4 px-2 grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_1fr_110px]"
        >
          <div>
            <strong>Min Price</strong>
            <input
              type="number"
              name="minPrice"
              id="minPrice"
              defaultValue={defaultMinPrice!}
            />
          </div>
          <div>
            <strong>Max Price</strong>
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              defaultValue={defaultMaxPrice!}
            />
          </div>
          <div>
            <strong>Color</strong>
            <select name="color" defaultValue={defaultColor!}>
              <option value="">Any color</option>
              <option value="red">Red</option>
              <option value="white">White</option>
              <option value="green">Green</option>
            </select>
          </div>
          <div className="flex">
            <button type="submit" className="btn mt-auto mb-[2px]">
              Submit
            </button>
          </div>
        </form>
      </fieldset>
      {!loading && !!data?.allCar?.nodes?.length && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data?.allCar?.nodes.map((car: CarSearchDataProps) => {
            return (
              <div
                className="flex flex-col border border-stone-200 bg-stone-100 p-2"
                key={car.databaseId}
              >
                {!!car.featuredImage?.node?.sourceUrl && (
                  <img
                    className="h-[200px] w-full object-cover"
                    src={car?.featuredImage?.node?.sourceUrl}
                    alt={car.title}
                  />
                )}
                <div className="lg:flex justify-between my-2 gap-2 font-heading text-xl font-bold">
                  <div className="my-2">{car.title}</div>
                  <div className="text-right">
                    <div className="bg-emerald-900 inline-block whitespace-nowrap text-white p-2">
                      <FontAwesomeIcon icon={faTag} /> £
                      {numeral(car.carDetails.price).format('0,0')}
                    </div>
                  </div>
                </div>
                <div>
                  <CtaBtn
                    fullWidth
                    label="View more details"
                    destination={car.uri}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!!totalResults && (
        <div className="flex items-center justify-center my-4 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            return <PageNumber key={index} pageNumber={index + 1} />;
          })}
        </div>
      )}
      <div></div>
    </div>
  );
};

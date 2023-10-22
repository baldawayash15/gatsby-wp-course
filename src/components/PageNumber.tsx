import React from 'react';
import { CtaBtn } from './CtaBtn';

interface PageNumberProps {
  pageNumber: any;
}

export const PageNumber: React.FC<PageNumberProps> = ({ pageNumber }) => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const currentPageNumber = params.get('page');
    params.set('page', pageNumber);
    return (
      <CtaBtn
        label={pageNumber}
        destination={`${window.location.pathname}?${params.toString()}`}
        isActive={(currentPageNumber || '1') === pageNumber.toString()}
      />
    );
  }
  return null;
};

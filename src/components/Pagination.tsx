import { FC, useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';

interface Props {
  pages: Array<number>;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<Props> = ({ pages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPage = (currentPage: number) => {
    if (currentPage > 0 && currentPage <= pages.length - 1) {
      setCurrentPage(currentPage);
      onPageChange(currentPage);
    }
  };

  return (
    <PaginationWrapper>
      <PaginationList>
        <PaginationItem
          className="pag-nav"
          onClick={() => {
            handleClickPage(currentPage - 1);
          }}
        >
          Prev
        </PaginationItem>
        {pages.map(
          (page) =>
            page !== 0 && (
              <PaginationItem
                className={currentPage === page ? 'current' : ''}
                key={page}
                onClick={() => {
                  handleClickPage(page);
                }}
              >
                {page}
              </PaginationItem>
            )
        )}
        <PaginationItem
          className="pag-nav"
          onClick={() => {
            handleClickPage(currentPage + 1);
          }}
        >
          Next
        </PaginationItem>
      </PaginationList>
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  padding: 1.5em;
`;

const PaginationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const PaginationItem = styled.li`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-weight: 300;

  text-decoration: none;
  border: 2px solid #eee;
  color: #222;
  cursor: pointer;
  border-radius: 0.5em;
  margin: 0 3px;
  min-width: 45px;
  min-height: 45px;

  ${mobile({ display: 'none' })}

  &.pag-nav {
    background-color: #eee;
    padding: 0 1.5em;
  }

  &.current,
  &.pag-nav {
    ${mobile({ display: 'flex' })}
  }

  &.current {
    background-color: #333;
    color: #fff;
    font-weight: bold;
  }
`;

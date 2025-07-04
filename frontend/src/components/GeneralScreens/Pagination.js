import React from 'react'
import '../../Css/Pagination.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { TiMinus } from 'react-icons/ti'

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const DOTS = '...';

function usePagination({ page, pages, siblingCount = 1 }) {
    const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, 2 siblings each side, 2 dots
    if (pages <= totalPageNumbers) {
        return range(1, pages);
    }
    const leftSiblingIndex = Math.max(page - siblingCount, 2);
    const rightSiblingIndex = Math.min(page + siblingCount, pages - 1);
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < pages - 1;
    const pagination = [1];
    if (showLeftDots) {
        pagination.push(DOTS);
    } else {
        for (let i = 2; i < leftSiblingIndex; i++) pagination.push(i);
    }
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pagination.push(i);
    }
    if (showRightDots) {
        pagination.push(DOTS);
    } else {
        for (let i = rightSiblingIndex + 1; i < pages; i++) pagination.push(i);
    }
    pagination.push(pages);
    return pagination;
}

const Pagination = ({ page, pages, changePage }) => {
    const paginationRange = usePagination({ page, pages, siblingCount: 1 });
    if (pages <= 1) return null;

    return (
        <nav className="pagination" role="navigation" aria-label="Pagination Navigation">
            <button
                className="pagination__prev"
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                aria-label="Previous Page"
            >
                <FaChevronLeft />
            </button>
            {paginationRange.map((item, idx) => {
                if (item === DOTS) {
                    return (
                        <span key={idx} className="pagination__dots" aria-hidden>
                            ...
                        </span>
                    );
                }
                return (
                    <button
                        key={item}
                        onClick={() => changePage(item)}
                        disabled={item === page}
                        aria-current={item === page ? 'page' : undefined}
                        className={item === page ? 'pagination__active' : ''}
                    >
                        {item}
                    </button>
                );
            })}
            <button
                className="pagination__next"
                onClick={() => changePage(page + 1)}
                disabled={page === pages}
                aria-label="Next Page"
            >
                <FaChevronRight />
            </button>
        </nav>
    );
}

export default Pagination

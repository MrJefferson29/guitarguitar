import React from 'react';
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from 'react-icons/fa';
import styled from 'styled-components';

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

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pages) {
            changePage(newPage);
        }
    };

    const handleKeyDown = (e, newPage) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePageChange(newPage);
        }
    };

    return (
        <PaginationContainer>
            <PaginationWrapper>
                {/* Previous Button */}
                <PaginationButton
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    aria-label="Go to previous page"
                    onKeyDown={(e) => handleKeyDown(e, page - 1)}
                >
                    <FaChevronLeft />
                    <span className="button-text">Previous</span>
                </PaginationButton>

                {/* Page Numbers */}
                <PageNumbers>
                    {paginationRange.map((item, idx) => {
                        if (item === DOTS) {
                            return (
                                <DotsButton
                                    key={`dots-${idx}`}
                                    aria-label="More pages"
                                    disabled
                                >
                                    <FaEllipsisH />
                                </DotsButton>
                            );
                        }
                        
                        return (
                            <PageButton
                                key={item}
                                onClick={() => handlePageChange(item)}
                                onKeyDown={(e) => handleKeyDown(e, item)}
                                isActive={item === page}
                                aria-label={`Go to page ${item}`}
                                aria-current={item === page ? 'page' : undefined}
                            >
                                {item}
                            </PageButton>
                        );
                    })}
                </PageNumbers>

                {/* Next Button */}
                <PaginationButton
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pages}
                    aria-label="Go to next page"
                    onKeyDown={(e) => handleKeyDown(e, page + 1)}
                >
                    <span className="button-text">Next</span>
                    <FaChevronRight />
                </PaginationButton>
            </PaginationWrapper>

            {/* Page Info */}
            <PageInfo>
                Page {page} of {pages}
            </PageInfo>
        </PaginationContainer>
    );
};

export default Pagination;

// Styled Components
const PaginationContainer = styled.nav`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
    width: 100%;
`;

const PaginationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: white;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid #e9ecef;
    
    @media (max-width: 768px) {
        padding: 0.5rem 0.75rem;
        gap: 0.25rem;
    }
    
    @media (max-width: 480px) {
        padding: 0.5rem;
        gap: 0.2rem;
    }
`;

const PageNumbers = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    @media (max-width: 480px) {
        gap: 0.1rem;
    }
`;

const PaginationButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    background: #f8f9fa;
    color: #495057;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 44px;
    height: 44px;
    justify-content: center;
    
    &:hover:not(:disabled) {
        background: #e9ecef;
        color: #212529;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:disabled {
        background: #f1f3f4;
        color: #9ca3af;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    .button-text {
        @media (max-width: 640px) {
            display: none;
        }
    }
    
    @media (max-width: 768px) {
        padding: 0.6rem 0.8rem;
        min-width: 40px;
        height: 40px;
        font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
        padding: 0.5rem 0.6rem;
        min-width: 36px;
        height: 36px;
        font-size: 0.8rem;
    }
`;

const PageButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 44px;
    padding: 0 0.75rem;
    border: none;
    border-radius: 8px;
    background: ${props => props.isActive ? '#007bff' : '#f8f9fa'};
    color: ${props => props.isActive ? 'white' : '#495057'};
    font-size: 0.9rem;
    font-weight: ${props => props.isActive ? '600' : '500'};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
        background: ${props => props.isActive ? '#0056b3' : '#e9ecef'};
        color: ${props => props.isActive ? 'white' : '#212529'};
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:disabled {
        cursor: default;
        transform: none;
        box-shadow: none;
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    @media (max-width: 768px) {
        min-width: 40px;
        height: 40px;
        padding: 0 0.6rem;
        font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
        min-width: 36px;
        height: 36px;
        padding: 0 0.5rem;
        font-size: 0.8rem;
    }
`;

const DotsButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 44px;
    padding: 0 0.75rem;
    border: none;
    border-radius: 8px;
    background: #f8f9fa;
    color: #6c757d;
    font-size: 0.9rem;
    cursor: default;
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
    }
    
    @media (max-width: 768px) {
        min-width: 40px;
        height: 40px;
        padding: 0 0.6rem;
        font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
        min-width: 36px;
        height: 36px;
        padding: 0 0.5rem;
        font-size: 0.8rem;
    }
`;

const PageInfo = styled.div`
    font-size: 0.9rem;
    color: #6c757d;
    font-weight: 500;
    
    @media (max-width: 768px) {
        font-size: 0.85rem;
    }
    
    @media (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

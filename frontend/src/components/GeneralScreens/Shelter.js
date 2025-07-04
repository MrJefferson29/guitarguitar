```javascript
// src/components/Shelter.js
import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import Pagination from "./Pagination";

export default function Shelter() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchKey = params.get("search") || "";
  const categoryKey = params.get("category") || "All";

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(parseInt(params.get("page"), 10) || 1);
  const [pages, setPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(categoryKey);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://guitarguitar.onrender.com/story/getAllStories?search=${encodeURIComponent(
            searchKey
          )}${
            selectedCategory !== "All"
              ? `&category=${encodeURIComponent(selectedCategory)}`
              : ""
          }&page=${page}`
        );
        setStories(data.data);
        setPages(data.pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [searchKey, selectedCategory, page]);

  // Sync URL
  useEffect(() => {
    const parts = [];
    if (searchKey) parts.push(`search=${encodeURIComponent(searchKey)}`);
    if (selectedCategory && selectedCategory !== "All")
      parts.push(`category=${encodeURIComponent(selectedCategory)}`);
    if (page > 1) parts.push(`page=${page}`);
    const query = parts.length ? `?${parts.join("&")}` : "";
    navigate({ pathname: "/store", search: query }, { replace: true });
  }, [searchKey, selectedCategory, page, navigate]);

  const categories = useMemo(() => {
    const setCats = new Set();
    stories.forEach((s) => s.category && setCats.add(s.category));
    return ["All", ...Array.from(setCats)];
  }, [stories]);

  const filteredStories =
    selectedCategory === "All"
      ? stories
      : stories.filter((s) => s.category === selectedCategory);

  return (
    <Section>
      {loading ? (
        <div className="skeleton-grid">
          {[...Array(6)].map(() => <SkeletonStory key={uuidv4()} />)}
        </div>
      ) : (
        <>
          <FilterBar>
            <label htmlFor="categoryFilter">Category:</label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </FilterBar>

          <StoriesGrid>
            {filteredStories.length
              ? filteredStories.map((story) => (
                  <CardStory key={uuidv4()} story={story} />
                ))
              : <NoStories />
            }
          </StoriesGrid>

          {pages > 1 && (
            <PaginationWrapper>
              <Pagination page={page} pages={pages} changePage={setPage} />
            </PaginationWrapper>
          )}
        </>
      )}
    </Section>
  );
}

const Section = styled.div`
  padding: 1rem;
  background: #fafafa;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #333;
  }
  select {
    padding: 0.4rem 0.6rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 0.95rem;
    transition: border-color 0.2s;
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;

  .pagination {
    background: #fff;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .pagination button {
    margin: 0 0.25rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    border: none;
    background: #eee;
    border-radius: 4px;
    transition: background 0.2s;
  }
  .pagination button:disabled {
    background: transparent;
    color: #aaa;
    cursor: default;
  }
  .pagination button:hover:not(:disabled) {
    background: #ddd;
  }
`;
```

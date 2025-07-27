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
        <SkeletonGrid>
          {[...Array(6)].map(() => {
            return <SkeletonStory key={uuidv4()} />;
          })}
        </SkeletonGrid>
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
            {filteredStories.length ? (
              filteredStories.map((story) => (
                <CardWrapper key={uuidv4()}>
                  <CardStory story={story} />
                </CardWrapper>
              ))
            ) : (
              <NoStories />
            )}
          </StoriesGrid>

          {pages > 1 && (
            <Pagination page={page} pages={pages} changePage={setPage} />
          )}
        </>
      )}
    </Section>
  );
}

const Section = styled.div`
  padding: 1rem;
  background: #fafafa;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;
  gap: 0.75rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;

  label {
    font-weight: 600;
    color: #333;
    font-size: 1rem;
  }
  
  select {
    padding: 0.6rem 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #f8f9fa;
    color: #495057;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
    
    &:hover {
      border-color: #adb5bd;
    }
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    padding: 0.75rem;
    gap: 0.5rem;
    
    label {
      font-size: 0.9rem;
    }
    
    select {
      padding: 0.5rem 0.75rem;
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-size: 0.85rem;
    }
    
    select {
      width: 100%;
      max-width: 200px;
    }
  }
`;

const StoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.25rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;



const CardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.25rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

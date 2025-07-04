import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";

export default function Shelter() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchKey = params.get("search") || "";
  const categoryKey = params.get("category") || "All";

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryKey);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://guitarguitar.onrender.com/story/getAllStories?search=${encodeURIComponent(searchKey)}${
            selectedCategory !== "All" ? `&category=${encodeURIComponent(selectedCategory)}` : ''
          }`
        );
        setStories(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [searchKey, selectedCategory]);

  // Update URL when category changes
  useEffect(() => {
    const queryParts = [];
    if (searchKey) queryParts.push(`search=${encodeURIComponent(searchKey)}`);
    if (selectedCategory && selectedCategory !== "All")
      queryParts.push(`category=${encodeURIComponent(selectedCategory)}`);

    const queryString = queryParts.length ? `?${queryParts.join("&")}` : "";
    navigate({ pathname: "/store", search: queryString }, { replace: true });
  }, [searchKey, selectedCategory, navigate]);

  const categories = useMemo(() => {
    const cats = new Set();
    stories.forEach(s => s.category && cats.add(s.category));
    return ["All", ...Array.from(cats)];
  }, [stories]);

  const filteredStories =
    selectedCategory === "All"
      ? stories
      : stories.filter(s => s.category === selectedCategory);

  return (
    <SectionWrapper>
      {loading ? (
        <div className="skeleton_emp">
          {[...Array(6)].map(() => <SkeletonStory key={uuidv4()} />)}
        </div>
      ) : (
        <>
          <FilterContainer>
            <label htmlFor="categoryFilter">Filter by Category:</label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </FilterContainer>

          <div className="story-card-wrapper">
            {filteredStories.length
              ? filteredStories.map(story => (
                  <CardStory key={uuidv4()} story={story} />
                ))
              : <NoStories />
            }
            <img className="bg-planet-svg" src="planet.svg" alt="planet" />
            <img className="bg-planet2-svg" src="planet2.svg" alt="planet" />
            <img className="bg-planet3-svg" src="planet3.svg" alt="planet" />
          </div>
        </>
      )}
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  padding: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;

  label {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-right: 0.75rem;
  }

  select {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #fff;
    appearance: none;
    cursor: pointer;

    &:hover { border-color: #999; }
    &:focus {
      outline: none;
      border-color: #6666ff;
      box-shadow: 0 0 0 2px rgba(102,102,255,0.2);
    }
  }
`;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";                // ← Import styled-components
import SkeletonStory from "../Skeletons/SkeletonStory";
import CardStory from "../StoryScreens/CardStory";
import NoStories from "../StoryScreens/NoStories";
import Pagination from "./Pagination";
import "../../Css/Home.css";

const Shelter = () => {
  const search = useLocation().search;
  const searchKey = new URLSearchParams(search).get("search");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const getStories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://guitarguitar.onrender.com/story/getAllStories?search=${searchKey || ""}&page=${page}`
        );

        if (searchKey) {
          navigate({
            pathname: "/store",
            search: `?search=${searchKey}${page > 1 ? `&page=${page}` : ""}`,
          });
        } else {
          navigate({
            pathname: "/store",
            search: `${page > 1 ? `page=${page}` : ""}`,
          });
        }

        setStories(data.data);
        setPages(data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    };

    getStories();
  }, [searchKey, page, navigate]);

  useEffect(() => {
    setPage(1);
    setSelectedCategory("All");
  }, [searchKey]);

  // Build a unique list of categories from the fetched stories
  const categories = React.useMemo(() => {
    const cats = new Set();
    stories.forEach((story) => {
      if (story.category) cats.add(story.category);
    });
    return ["All", ...Array.from(cats)];
  }, [stories]);

  // Filter stories based on the selected category
  const filteredStories =
    selectedCategory === "All"
      ? stories
      : stories.filter((story) => story.category === selectedCategory);

  return (
    <SectionWrapper>
      {loading ? (
        <div className="skeleton_emp">
          {[...Array(6)].map(() => (
            <SkeletonStory key={uuidv4()} />
          ))}
        </div>
      ) : (
        <div>
          {/* ─── CATEGORY FILTER DROPDOWN ───────────────────────────────────── */}
          <FilterContainer>
            <label htmlFor="categoryFilter">Filter by Category:</label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </FilterContainer>

          {/* ─── STORY CARDS GRID ───────────────────────────────────────────── */}
          <div className="story-card-wrapper">
            {filteredStories.length !== 0 ? (
              filteredStories.map((story) => (
                <CardStory key={uuidv4()} story={story} />
              ))
            ) : (
              <NoStories />
            )}

            {/* Background SVGs (unchanged) */}
            <img className="bg-planet-svg" src="planet.svg" alt="planet" />
            <img className="bg-planet2-svg" src="planet2.svg" alt="planet" />
            <img className="bg-planet3-svg" src="planet3.svg" alt="planet" />
          </div>

          {/* ─── PAGINATION CONTROL ──────────────────────────────────────────── */}
          <Pagination page={page} pages={pages} changePage={setPage} />
        </div>
      )}
      <br />
    </SectionWrapper>
  );
};

export default Shelter;

/* ─── Styled Components ───────────────────────────────────────────────────────── */
const SectionWrapper = styled.div`
  /* You can add padding/margin around the entire section if needed */
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
    color: #333333;
    margin-right: 0.75rem;
  }

  select {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    border: 1px solid #cccccc;
    border-radius: 6px;
    background-color: #ffffff;
    color: #333333;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    min-width: 180px;
    cursor: pointer;

    /* Remove default arrow on some browsers (optional) */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 8L0.803848 0.5L11.1962 0.5L6 8Z' fill='%23333'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 12px 8px;

    &:hover {
      border-color: #999999;
    }

    &:focus {
      outline: none;
      border-color: #6666ff;
      box-shadow: 0 0 0 2px rgba(102, 102, 255, 0.2);
    }
  }
`;

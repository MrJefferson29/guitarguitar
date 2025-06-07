import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiMail, FiHeart, FiEdit, FiArrowLeft } from "react-icons/fi";
import {
  FaRegHeart,
  FaHeart,
  FaCreditCard,
  FaPaypal,
  FaRegComment,
} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBookmarkPlus, BsThreeDots, BsBookmarkFill } from "react-icons/bs";
import { SiApplepay, SiGooglepay } from "react-icons/si";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const DetailStory = () => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeUser, setActiveUser] = useState({});
  const [story, setStory] = useState({});
  const [storyLikeUser, setStoryLikeUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);

  // ← NEW: state for “similar” stories
  const [similarStories, setSimilarStories] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  const slug = useParams().slug;
  const navigate = useNavigate();

  const handleEmailClick = () => {
    const email = "guitarguitar.help@gmail.com";
    const subject = `Purchase of ${story.name}`;
    const body = `Dear Guitar team,\n\nI am interested in Purchasing ${story.name} \n\nCould you please provide more details regarding its availability and delivery arrangements?\n\ Peace!!\n\n[Your Name]`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  // ─── FETCH CURRENT STORY & ACTIVE USER ────────────────────────────────────
  useEffect(() => {
    const getDetailStory = async () => {
      setLoading(true);
      let currentUser = {};

      // 1) fetch logged-in user (if any)
      try {
        const { data } = await axios.get("http://localhost:5000/auth/private", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        currentUser = data.user;
        setActiveUser(currentUser);
      } catch (error) {
        setActiveUser({});
      }

      // 2) fetch story by slug
      try {
        const { data } = await axios.post(
          `http://localhost:5000/story/${slug}`,
          { activeUser: currentUser }
        );

        setStory(data.data);
        setLikeStatus(data.likeStatus);
        setLikeCount(data.data.likeCount);
        setStoryLikeUser(data.data.likes);
        setLoading(false);

        // check if in user's readList
        const story_id = data.data._id;
        if (currentUser.readList) {
          setStoryReadListStatus(currentUser.readList.includes(story_id));
        }
      } catch (error) {
        setStory({});
        navigate("/not-found");
      }
    };

    getDetailStory();
  }, [slug, navigate]);

  // ─── FETCH SIMILAR STORIES WHEN CATEGORY IS KNOWN ─────────────────────────
  useEffect(() => {
    const getSimilarStories = async () => {
      if (!story.category) {
        setSimilarStories([]);
        setLoadingSimilar(false);
        return;
      }
      setLoadingSimilar(true);

      try {
        const { data } = await axios.get(
          `http://localhost:5000/story/getAllStories`
        );
        const allStories = data.data;
        const filtered = allStories.filter(
          (s) => s.category === story.category && s._id !== story._id
        );
        setSimilarStories(filtered);
      } catch (error) {
        setSimilarStories([]);
      }
      setLoadingSimilar(false);
    };

    getSimilarStories();
  }, [story.category, story._id]);

  // ─── HANDLE “LIKE” ────────────────────────────────────────────────────────
  const handleLike = async () => {
    setLikeStatus((prev) => !prev); // Optimistic UI

    try {
      const { data } = await axios.post(
        `http://localhost:5000/story/${slug}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setLikeCount(data.data.likeCount);
      setStoryLikeUser(data.data.likes);
    } catch (error) {
      setLikeStatus((prev) => !prev);
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  // ─── HANDLE “DELETE” ──────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this post")) {
      try {
        await axios.delete(`http://localhost:5000/story/${slug}/delete`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ─── ADD STORY TO READ LIST ───────────────────────────────────────────────
  const addStoryToReadList = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/user/${slug}/addStoryToReadList`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      setStoryReadListStatus(data.status);
      document.getElementById("readListLength").textContent =
        data.user.readListLength;
    } catch (error) {
      console.log(error);
    }
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <PageWrapper>
      <div className="carousel-wrapper">
        {activeUser && story.author && story.author._id === activeUser._id && (
          <div className="top_story_transactions">
            <Link
              className="editStoryLink"
              to={`/story/${story.slug}/edit`}
              title="Edit Story"
            >
              <FiEdit />
            </Link>
            <span
              className="deleteStoryLink"
              onClick={handleDelete}
              title="Delete Story"
            >
              <RiDeleteBin6Line />
            </span>
          </div>
        )}

        <div className="product-container">
          <h1 className="product-title">{story.title}</h1>
          <p className="includes-text">Includes Hard Case</p>

          <div className="product-main">
            <div className="product-image">
              {story.imageUrls && story.imageUrls.length > 0 ? (
                <Slider {...sliderSettings}>
                  {story.imageUrls.slice(0, 5).map((url, i) => (
                    <div key={i}>
                      <img
                        src={url}
                        alt={`${story.title} ${i + 1}`}
                        onClick={() => window.open(url, "_blank")}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <p>No images available.</p>
              )}
            </div>

            <div className="product-info">
              <h2 className="price">£ {story.price}</h2>
              <p className="stock-status">Available to Order</p>

              <div className="payment-buttons">
                <button className="btn order-btn" aria-label="Payment Options">
                  <FaCreditCard title="Debit / Credit Card" />
                  <FaPaypal title="PayPal" />
                  <SiApplepay title="Apple Pay" />
                  <SiGooglepay title="Google Pay" />
                </button>

                <button className="btn pay-btn" onClick={handleEmailClick}>
                  Pay £ {story.price}
                </button>
              </div>

              <div className="stock-notify">
                <h4>Notify me for similar items</h4>
                <input type="email" placeholder="Enter your email" />
                <button className="btn notify-btn" onClick={handleEmailClick}>
                  Email me
                </button>
              </div>
            </div>
          </div>

          <div className="product-description">
            <div dangerouslySetInnerHTML={{ __html: story.content }} />
          </div>
        </div>
      </div>

      {/* ─── SIMILAR PRODUCTS SECTION ──────────────────────────────────────────── */}
      <SimilarWrapper>
        <h2>Similar Products</h2>

        {loadingSimilar ? (
          <p>Loading...</p>
        ) : similarStories.length > 0 ? (
          <div className="similar-scroll">
            {similarStories.map((simStory) => (
              <Link
                key={simStory._id}
                to={`/story/${simStory.slug}`}
                className="similar-card"
              >
                <img
                  src={
                    story.imageUrls && story.imageUrls.length > 0
                      ? story.imageUrls[0]
                      : ""
                  }
                  alt={simStory.title}
                />
                <p className="sim-title">{simStory.title}</p>
                <p className="sim-price">£ {simStory.price}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No similar products found.</p>
        )}
      </SimilarWrapper>
    </PageWrapper>
  );
};

export default DetailStory;

/* ─── STYLED COMPONENTS ───────────────────────────────────────────────────── */
const PageWrapper = styled.div`
  background-color: #fdfdfd;
  min-height: 100vh;

  .carousel-wrapper {
    position: relative;
  }

  .product-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    font-family: "Segoe UI", sans-serif;
    color: #222;
  }

  .product-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    line-height: 1.3;
    color: #333;
  }

  .includes-text {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1.5rem;
  }

  .product-main {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .product-image {
    flex: 1;
    min-width: 280px;
    text-align: center;
  }

  .product-image img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .product-info {
    flex: 1;
    min-width: 300px;
  }

  .price {
    font-size: 1.6rem;
    color: #222;
    margin-bottom: 0.5rem;
  }

  .stock-status {
    color: #2e8b57;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .btn {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    margin: 0.4rem 0;
    font-size: 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .order-btn {
    background-color: #d1f2d1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
  }

  .order-btn:hover {
    background-color: #b8e6b8;
  }

  .order-btn svg {
    font-size: 1.6rem;
  }

  .pay-btn {
    background-color: #bae1ff;
    font-weight: bold;
  }

  .pay-btn:hover {
    background-color: #a0d4ff;
  }

  .stock-notify {
    margin-top: 1.5rem;
  }

  .stock-notify h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }

  .stock-notify input {
    width: 100%;
    padding: 0.6rem;
    margin: 0.6rem 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .notify-btn {
    background-color: #ffe0b3;
  }

  .notify-btn:hover {
    background-color: #ffd08c;
  }

  .product-description {
    margin-bottom: 2.5rem;
  }

  .product-description p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .top_story_transactions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem 2rem 0;
  }

  .editStoryLink,
  .deleteStoryLink {
    cursor: pointer;
    color: #444;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }

  .editStoryLink:hover,
  .deleteStoryLink:hover {
    color: #ff5252;
  }
`;

const SimilarWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 2rem;

  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .similar-scroll {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 1rem;
  }

  .similar-card {
    flex: 0 0 auto;
    width: 200px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    color: inherit;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .similar-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  .similar-card img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .sim-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.75rem 0 0.25rem;
    color: #222;
    padding: 0 0.5rem;
  }

  .sim-price {
    font-size: 1.1rem;
    font-weight: 700;
    color: #f1c40f;
    margin-bottom: 0.75rem;
  }
`;

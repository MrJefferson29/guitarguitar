import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiMail, FiHeart, FiEdit, FiArrowLeft, FiShare2, FiBookmark } from "react-icons/fi";
import {
  FaRegHeart,
  FaHeart,
  FaCreditCard,
  FaPaypal,
  FaRegComment,
  FaStar,
} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBookmarkPlus, BsThreeDots, BsBookmarkFill } from "react-icons/bs";
import { SiApplepay, SiCashapp, SiGooglepay, SiVenmo } from "react-icons/si";
import { IoShieldCheckmark } from "react-icons/io5";
import "../../Css/DetailStory.css";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
      }
    }
  ]
};

const DetailStory = () => {
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeUser, setActiveUser] = useState({});
  const [story, setStory] = useState({});
  const [storyLikeUser, setStoryLikeUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);
  const [similarStories, setSimilarStories] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  const slug = useParams().slug;
  const navigate = useNavigate();

  const handleEmailClick = () => {
    const email = "guitarguitar.help@gmail.com";
    const subject = `Purchase of ${story.title}`;
    const body = `Dear Guitar team,\n\nI am interested in purchasing ${story.title} \n\nCould you please provide more details regarding its availability and delivery arrangements?\n\nBest regards,\n[Your Name]`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: `Check out this amazing product: ${story.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // ─── FETCH CURRENT STORY & ACTIVE USER ────────────────────────────────────
  useEffect(() => {
    const getDetailStory = async () => {
      setLoading(true);
      let currentUser = {};

      try {
        const { data } = await axios.get("https://guitarguitar.onrender.com/auth/private", {
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

      try {
        const { data } = await axios.post(
          `https://guitarguitar.onrender.com/story/${slug}`,
          { activeUser: currentUser }
        );

        setStory(data.data);
        setLikeStatus(data.likeStatus);
        setLikeCount(data.data.likeCount);
        setStoryLikeUser(data.data.likes);
        setLoading(false);

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
          `https://guitarguitar.onrender.com/story/getAllStories`
        );
        const allStories = data.data;
        const filtered = allStories.filter(
          (s) => s.category === story.category && s._id !== story._id
        );
        setSimilarStories(filtered.slice(0, 6));
      } catch (error) {
        setSimilarStories([]);
      }
      setLoadingSimilar(false);
    };

    getSimilarStories();
  }, [story.category, story._id]);

  // ─── HANDLE "LIKE" ────────────────────────────────────────────────────────
  const handleLike = async () => {
    setLikeStatus((prev) => !prev);

    try {
      const { data } = await axios.post(
        `https://guitarguitar.onrender.com/story/${slug}/like`,
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

  // ─── HANDLE "DELETE" ──────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://guitarguitar.onrender.com/story/${slug}/delete`, {
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
        `https://guitarguitar.onrender.com/user/${slug}/addStoryToReadList`,
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="detail-story-page">
      {/* Header with back button and actions */}
      <header className="story-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            <span>Back</span>
          </button>
          
          <div className="header-actions">
            <button className="action-btn" onClick={handleShare} title="Share">
              <FiShare2 />
            </button>
            <button 
              className="action-btn" 
              onClick={addStoryToReadList}
              title={storyReadListStatus ? "Remove from wishlist" : "Add to wishlist"}
            >
              {storyReadListStatus ? <BsBookmarkFill /> : <FiBookmark />}
            </button>
            {activeUser && story.author && story.author._id === activeUser._id && (
              <>
                <Link
                  className="action-btn"
                  to={`/story/${story.slug}/edit`}
                  title="Edit Product"
                >
                  <FiEdit />
                </Link>
                <button
                  className="action-btn delete-btn"
                  onClick={handleDelete}
                  title="Delete Product"
                >
                  <RiDeleteBin6Line />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Product Section */}
      <main className="main-container">
        <div className="product-container">
          <div className="product-header">
            <h1 className="product-title">{story.title}</h1>
            <div className="product-meta">
              <div className="rating">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span>(4.8)</span>
              </div>
              <span className="category">{story.category}</span>
            </div>
          </div>

          <div className="product-main">
            {/* Product Images */}
            <div className="product-image">
              {story.imageUrls && story.imageUrls.length > 0 ? (
                <div className="image-carousel">
                  <Slider {...sliderSettings} beforeChange={(oldIndex, newIndex) => setSelectedImage(newIndex)}>
                    {story.imageUrls.slice(0, 5).map((url, i) => (
                      <div key={i} className="slide">
                        <img
                          src={url}
                          alt={`${story.title} ${i + 1}`}
                          onClick={() => window.open(url, "_blank")}
                        />
                      </div>
                    ))}
                  </Slider>
                  
                  {/* Thumbnail Navigation */}
                  {story.imageUrls.length > 1 && (
                    <div className="thumbnail-nav">
                      {story.imageUrls.slice(0, 5).map((url, i) => (
                        <div 
                          key={i} 
                          className={`thumbnail ${selectedImage === i ? 'active' : ''}`}
                          onClick={() => setSelectedImage(i)}
                        >
                          <img src={url} alt={`Thumbnail ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="no-image">
                  <p>No images available</p>
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="product-info">
              <div className="price-section">
                <div className="price-main">
                  <span className="currency">$</span>
                  <span className="amount">{story.price}</span>
                </div>
                <div className="price-details">
                  <span className="includes">Includes Hard Case</span>
                  <span className="shipping">Free Shipping</span>
                </div>
              </div>

              <div className="availability">
                <div className="status-badge in-stock">
                  <IoShieldCheckmark />
                  <span>Available to Order</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="btn pay-btn" onClick={handleEmailClick}>
                  <FaCreditCard />
                  <span>Purchase Now</span>
                </button>
                
                <button className="btn wishlist-btn" onClick={handleLike}>
                  {likeStatus ? <FaHeart /> : <FaRegHeart />}
                  <span>{likeStatus ? 'Liked' : 'Like'}</span>
                  {likeCount > 0 && <span className="count">({likeCount})</span>}
                </button>
              </div>

              <div className="payment-methods">
                <h4>Accepted Payment Methods</h4>
                <div className="payment-icons">
                  <FaCreditCard title="Credit/Debit Card" />
                  <FaPaypal title="PayPal" />
                  <SiApplepay title="Apple Pay" />
                  <SiGooglepay title="Google Pay" />
                  <SiCashapp title="Cash App" />
                  <SiVenmo title="Venmo" />
                </div>
              </div>

              <div className="stock-notify">
                <h4>Get notified about similar products</h4>
                <div className="notify-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="email-input"
                  />
                  <button className="btn notify-btn" onClick={handleEmailClick}>
                    <FiMail />
                    <span>Notify Me</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="product-description">
            <h2>Product Description</h2>
            <div className="description-content">
              <div dangerouslySetInnerHTML={{ __html: story.content }} />
            </div>
          </div>
        </div>
      </main>

      {/* Similar Products Section */}
      <section className="similar-section">
        <div className="similar-header">
          <h2>Similar Products</h2>
          <p>You might also like these products</p>
        </div>

        {loadingSimilar ? (
          <div className="loading-similar">
            <div className="loading-spinner"></div>
            <p>Loading similar products...</p>
          </div>
        ) : similarStories.length > 0 ? (
          <div className="similar-grid">
            {similarStories.map((simStory) => (
              <Link
                key={simStory._id}
                to={`/story/${simStory.slug}`}
                className="similar-card"
              >
                <div className="card-image">
                  <img
                    src={simStory.imageUrls && simStory.imageUrls.length > 0 ? simStory.imageUrls[0] : ""}
                    alt={simStory.title}
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{simStory.title}</h3>
                  <p className="card-price">$ {simStory.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-similar">
            <p>No similar products found</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DetailStory;



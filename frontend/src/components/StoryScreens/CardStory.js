import React from "react";
import { Link } from "react-router-dom";

const Story = ({ story }) => {
  return (
    <div style={styles.card}>
      <Link
        to={`/story/${story.slug}`}
        className="story-link"
        style={styles.link}
      >
        <div style={styles.ribbon}>In Stock</div>
        <div style={styles.content}>
          <img
            src={
              story.imageUrls && story.imageUrls.length > 0
                ? story.imageUrls[0]
                : ""
            }
            alt={story.title || "Product Image"}
            style={styles.image}
          />
          <div style={styles.details}>
            <p style={styles.title}>
              <strong>{story.title}</strong>
            </p>
            <p style={styles.price}>$ {story.price}</p>
            <p style={styles.delivery}>
              <span style={styles.deliveryHighlight}>{story.category}</span>
            </p>
            <p style={styles.availability}>Available to Order</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    position: "relative",
    border: "1px solid #e0e0e0",
    padding: "20px",
    width: "100%",
    maxWidth: "400px",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    borderRadius: "12px",
    backgroundColor: "#fff",
    margin: "auto",
    transition: "transform 0.3s ease",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  ribbon: {
    position: "absolute",
    top: "15px",
    left: "15px",
    backgroundColor: "#00B8D9",
    color: "#fff",
    fontSize: "13px",
    padding: "5px 10px",
    borderRadius: "4px",
    fontWeight: "600",
    zIndex: 1,
  },
  content: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "40px",
  },
  image: {
    flexShrink: 0,
    width: "120px",
    height: "110px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "15px",
    fontWeight: "500",
    margin: "0 0 10px",
    lineHeight: "1.5",
    color: "#333",
  },
  price: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111",
    margin: "5px 0 10px",
  },
  delivery: {
    fontSize: "13px",
    color: "#555",
    marginBottom: "5px",
  },
  deliveryHighlight: {
    color: "#000",
    fontWeight: "bold",
  },
  availability: {
    fontSize: "14px",
    color: "#007F3F",
    fontWeight: "500",
  },
};

export default Story;

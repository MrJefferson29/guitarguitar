// src/components/EditStory.jsx
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import Loader from "../GeneralScreens/Loader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Row, Col } from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";
import "../../Css/EditStory.css";

const MAX_FILES = 5;

const EditStory = () => {
  const { config } = useContext(AuthContext);
  const slug = useParams().slug;
  const imageEl = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState({});
  const [previousImages, setPreviousImages] = useState([]);   // array of existing URLs
  const [files, setFiles] = useState([]);                     // array of new File objects
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Fetch story + its images
  useEffect(() => {
    const getStoryInfo = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://guitarguitar.onrender.com/story/editStory/${slug}`,
          config
        );
        const info = data.data;
        setStory(info);
        setTitle(info.title);
        setPrice(info.price);
        setCategory(info.category);
        setContent(info.content);
        // assume backend sends an array `info.imageUrls`
        setPreviousImages(info.imageUrls || []);
      } catch (err) {
        return navigate("/");
      } finally {
        setLoading(false);
      }
    };
    getStoryInfo();
  }, [slug, config, navigate]);

  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files);
    // enforce max
    const total = previousImages.length + picked.length;
    if (total > MAX_FILES) {
      setError(`You can have at most ${MAX_FILES} images total.`);
      return setTimeout(() => setError(""), 5000);
    }
    setFiles(picked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // must have at least one image overall
    if (previousImages.length + files.length === 0) {
      setError("You must keep or upload at least one image.");
      return setTimeout(() => setError(""), 5000);
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("price", price);
    formdata.append("category", category);

    // keep each old URL so backend knows not to delete it
    previousImages.forEach((url) =>
      formdata.append("previousImages", url)
    );

    // append any new files under the same field your addStory uses
    files.forEach((f) => formdata.append("my_files", f));

    try {
      await axios.put(
        `https://guitarguitar.onrender.com/story/${slug}/edit`,
        formdata,
        {
          ...config,
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Story updated successfully!");
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setTimeout(() => setError(""), 5000);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="Inclusive-editStory-page">
      <Link to="/" className="back-link">← Back</Link>
      <form onSubmit={handleSubmit} className="editStory-form">
        {error && <div className="error_msg">{error}</div>}
        {success && (
          <div className="success_msg">
            <span>{success}</span>
            <Link to="/">Go home</Link>
          </div>
        )}

        <Row>
          <Col md="6" className="mb-4">
            <input
              className="inp"
              type="text"
              placeholder="Package name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
            <input
              className="inp"
              type="text"
              placeholder="What is the price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <select
              className="inp"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a Category</option>
              {[
                "New for 2025",
                "Electric",
                "Acoustic",
                "Bass",
                "Amps",
                "Pedals",
                "Studio",
                "PA",
                "Mics",
                "Keys & Pianos",
                "Drums",
                "Accessories",
                "Pre-Owned",
                "Offers",
                "Clearance",
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </Col>

          <Col md="6" className="mb-4">
            <div className="editor-wrapper">
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(evt, editor) =>
                  setContent(editor.getData())
                }
              />
            </div>
          </Col>
        </Row>

        {/* show existing images */}
        {previousImages.length > 0 && (
          <div className="current-images-preview">
            <h5>Keep these images:</h5>
            <div className="prev-images-row">
              {previousImages.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`current-${i}`}
                  className="thumb"
                />
              ))}
            </div>
          </div>
        )}

        {/* new file picker */}
        <div
          className="StoryImageField"
          onClick={() => imageEl.current?.click()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem",
            border: "1px dashed #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <AiOutlineUpload size={24} />
          <div className="txt">
            {files.length > 0
              ? files.map((f) => f.name).join(", ")
              : `Click here to select up to ${MAX_FILES - previousImages.length
                } new image(s).`}
          </div>
          <input
            name="images"
            type="file"
            multiple
            accept="image/*"
            ref={imageEl}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <button type="submit" className="editStory-btn">
          Edit Story
        </button>
      </form>
    </div>
  );
};

export default EditStory;

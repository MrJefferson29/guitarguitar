// src/components/AddStory.jsx
import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FiArrowLeft } from "react-icons/fi";
import { Row, Col } from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../Css/AddStory.css";

const AddStory = () => {
  const { config } = useContext(AuthContext);
  const imageEl = useRef(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState([]); // array of File objects
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const clearInputs = () => {
    setTitle("");
    setPrice("");
    setCategory("");
    setFiles([]);
    setContent("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      setError("Please upload at least one image.");
      setTimeout(() => setError(""), 5000);
      return;
    }
    if (files.length > 8) {
      setError("You can upload a maximum of 8 images.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("price", price);
    formdata.append("category", category);

    // Append each File under the same field name "my_files"
    for (let i = 0; i < files.length; i++) {
      formdata.append("my_files", files[i]);
    }

    try {
      const { data } = await axios.post(
        "https://guitarguitar.onrender.com/story/addstory",
        formdata,
        {
          ...config,
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Story posted successfully! Good job!");
      clearInputs();
      setTimeout(() => setSuccess(""), 7000);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
      setTimeout(() => setError(""), 7000);
    }
  };

  // Handler for when user selects files:
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  return (
    <div className="Inclusive-addStory-page">
      <Link to="/" className="back-link">
        <FiArrowLeft /> Back
      </Link>

      <form onSubmit={handleSubmit} className="addStory-form">
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
                onChange={(event, editor) =>
                  setContent(editor.getData())
                }
              />
            </div>
          </Col>
        </Row>

        <div
          className="StoryImageField"
          onClick={() => imageEl.current?.click()}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: "0.5rem",
            padding: "0.75rem",
            border: "1px dashed #ccc",
            borderRadius: "4px",
          }}
        >
          <AiOutlineUpload size={24} />
          <div className="txt">
            {files.length > 0
              ? files.map((f) => f.name).join(", ")
              : "Click here (or drag) to include up to 8 images."}
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

        <button type="submit" className="addStory-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddStory;

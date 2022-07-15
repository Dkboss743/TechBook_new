import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config";

import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import Layout from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import FormData from "form-data";
const Create = ({ user, token }) => {
  const [state, setState] = useState({
    name: "",
    content: "",
    error: "",
    success: "",
    formData: typeof window && new FormData(),
    buttonText: "Create",
    imageUploadText: "Upload image",
  });
  const { formData } = state;
  const { name, content, buttonText, imageUploadText } = state;
  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    const imageName =
      name === "image" ? e.target.files[0].name : "Upload Image";
    if (name === "image") {
      console.log(e.target.files);
    }
    formData.set(name, value);
    setState({
      ...state,
      [name]: value,
      error: "",
      success: "",
      imageUploadText: imageName,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      buttonText: "Creating",
    });
    try {
      const response = await axios.post(`${API}/category`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("CATEGORY CREATE RESPONSE", response);
      setState({
        ...state,
        name: "",
        formData: "",
        buttonText: "Created",
        success: `${response.data.name} is created`,
        imageUploadText: "Upload image",
      });
    } catch (error) {
      console.log("CATEGORY CREATE ERROR", error);
      setState({
        ...state,
        name: "",
        formData: "",
        buttonText: "Create",
        error: error.response.data.error,
      });
    }
  };

  const createCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          value={name}
          type="text"
          className="form-control"
          required
        ></input>
      </div>
      <div className="form-group">
        <label className="text-muted">Content</label>
        <textarea
          onChange={handleChange("content")}
          value={content}
          className="form-control"
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label className="btn btn-outline-secondary">
          {imageUploadText}
          <input
            onChange={handleChange("image")}
            type="file"
            accept="image/*"
            className="form-control"
            required
            hidden
          ></input>
        </label>
      </div>
      <div>
        <button className="btn btn-outline-warning">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Create category</h1>
          <br />
          {createCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default withAdmin(Create);
